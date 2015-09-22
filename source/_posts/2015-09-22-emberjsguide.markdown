---
layout: post
title: "emberjs2 自定义adapter方法与json序列化model"
date: 2015-09-22 21:50
comments: true
categories: emberjs
---

1. 自定义adapter请求服务器

    有时候model CURD 满足不了我们的需求，需要自己定义方法请求服务器，我们可以把这种方法定义adapter
代码如下：
    
      App.UserAdapter = App.ApplicationAdapter.extend({
        createRelation: function(opts){
          var url = [this.urlPrefix(), "users", "/pass"].join("/")
          return this.ajax(url, "POST", {data: opts})  
        }
      })



  controller调用

      var adapter = this.store.adapterFor("user");
      adapter.createRelation({status: 1}).then(function(){
        // success
      }, function(){
        // catch
      })



2. json序列化model
  
  ```
  this.store.push(this.store.normalize("user", {id: 1, name: 'xxxxxxxxx'}))
  ```