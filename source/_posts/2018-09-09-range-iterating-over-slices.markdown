---
layout: post
title: "使用range迭代slice遇到的坑"
date: 2018-09-09 16:13
comments: true
categories: golang
---
刚接触golang迭代slice的时候遇到一个问题，其实就是传值与传值的地址问题引起的，我们先看一段代码  

[play code](https://play.golang.org/p/r5Hi5ggrzAs)

```go
package main

import (
  "fmt"
)

type User struct {
  Id   int
  Name string
  Vip  bool
}

func main() {

  users := []User{
    User{Id: 1, Name: "zhangsan", Vip: true}, 
    User{Id: 2, Name: "lisi", Vip: true},
  }

  vipUsers := make([]*User, 0)
  for _, u := range users {
    if u.Vip {
      vipUsers = append(vipUsers, &u)
    }
  }

  for _, vipUser := range vipUsers {
    fmt.Printf("user: %+v \n", vipUser)
  }

}
```

日志输出结果 
```
user: &{Id:2 Name:lisi Vip:true} 
user: &{Id:2 Name:lisi Vip:true}
```
是不是会有点不合符预期结果，这种问题新手最容易出现，for里面range将users迭代赋值给u局部变量，然后vipUsers slice保存的是u变量值的地址，所以vipUsers里面的元素全部是相同地址，也就是指向迭代的最后一个值。

修改片段代码可以达到我们想要的效果
```go
for i := 0; i<len(users); i++ {
  if u[i].Vip {
    vipUsers = append(vipUsers, &u[i])
  }
}

//or clone
for _, u := range users {
  if u.Vip {
    newUser := new(User)
    *newUser = *&u
    vipUsers = append(vipUsers, newUser)
  }
}

```

