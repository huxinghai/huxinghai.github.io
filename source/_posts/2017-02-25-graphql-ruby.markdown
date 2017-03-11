---
layout: post
title: "GraphQL与Ruby的使用"
date: 2017-02-25 11:58
comments: true
categories: graphql ruby
---
> GraphQL是Facekbook开源API数据查询语言，随着现在业务场景越来越复杂，一站式开发会产生工作协调低下、项目结构混乱的一些问题，现在比较流行前后端分离应用开发，前端和后台约定数据格式通过Ajax与API进行数据交互这样职责清晰、项目逻辑专注，而GraphQL就是一个数据抽象层，包括数据格式、数据关联、查询方式定义, GraphQL也并不是一个具体的后端编程框架，它只是使后端API能够提供更丰富的数据结构和更多复杂多变的查询方式的一种规范。

###ruby graphql简单例子
  - GraphQL::ObjectType.define 对象类型是解析GraphQL语法的一种数据关系映射
  - GraphQL::Relay::Mutation.define 对象数据变更定义
  - GraphQL::Schema.define 数据主入口，包括输入/输出

[例子地址](https://github.com/huxinghai1988/graphql-ruby-demo)


####基本类型定义
```ruby
module Types
  UserType = GraphQL::ObjectType.define do
    name "User"
    description "A User"

    field :id,   !types.ID
    field :name, !types.String
  end
end

module Types
  CommentType = GraphQL::ObjectType.define do
    name "Comment"
    description "A Comment"

    field :id,   !types.ID
    field :body, !types.String
    field :user, UserType
  end
end

module Types
  PostType = GraphQL::ObjectType.define do
    name "Post"
    description "A Post"

    field :id,   !types.ID
    field :body, !types.String
    field :user, UserType
    field :comments, types[CommentType]
  end
end

module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root for this schema"

    field :post, PostType do
      argument :id, types.ID
      resolve ->(obj, args, ctx) {
        Post.find(args[:id])
      }
    end

    field :posts, types[PostType] do 
      resolve ->(obj, args, ctx) {
        Post.all
      }
    end
  end
end

module Types
  MutationType = GraphQL::ObjectType.define do
    name "Mutation"

    field :addPost, field: Mutations::AddPost.field
  end
end
```
```ruby
module Mutations

  AddPost = GraphQL::Relay::Mutation.define do
    name "AddPost"

    input_field :body, !types.String
    input_field :userId, !types.ID

    return_field :post, Types::PostType

    resolve ->(object, inputs, ctx) {
      post = Post.create!(body: inputs[:body], user_id: inputs[:userId])
      { post: post }
    }
  end

end
```
```ruby
StarWarsSchema = GraphQL::Schema.define do
  query Types::QueryType
  mutation Types::MutationType
end
```

####语法执行
```ruby
#查询所有文章
query_string = %|{
  posts {
    body
    user{ id name }
    comments{ id body }
  }
}|

result_hash = StarWarsSchema.execute(query_string)
#{
#  "data": {
#    "posts": [
#      {
#        "body": "article content",
#        "user": { "id": "1", "name": "kaka" },
#        "comments": []
#      }  
#    ]
#  }
#}

#查询单篇文章
query_string = %|{
  post(id: 1) {
    body
    user{ id name }
    comments{ id body }
  }
}|

result_hash = StarWarsSchema.execute(query_string)
#{
#  "data": {
#    "posts": {
#       "body": "article content",
#       "user": { "id": "1", "name": "kaka" },
#       "comments": []
#    }  
#  }
#}


#创建文章
query_string = %|
  mutation addPost {
    addPost(input: {userId: 1, body: "A GraphQL server implementation for Ruby"}){
      post{
        body
      }
    }
  }|

result_hash = StarWarsSchema.execute(query_string)
#{"data"=>{"addPost"=>{"post"=>{"body"=>"A GraphQL server implementation for Ruby"}}}}

```











