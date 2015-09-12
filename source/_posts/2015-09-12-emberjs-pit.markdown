---
layout: post
title: "emberjs 2.0 遇到一个坑"
date: 2015-09-12 11:52
comments: true
categories: emberjs 
---

最近项目使用emberjs 2.0版本，本身用2.0是比较纠结的事，由于之前就是只闻其术，不见其码，而且emberjs 1.x版本到2.0 做了一次无痛升级，之前用backbone框架感觉有些概念还是一样的，先说说用的emberjs 第一个坑贴代码。


```js
  //controller js 文件

  actions: {
    save: function(x){
      var tag = this.store.createRecord("tag", {name: this.get("newName")})
      
      tag.save().then(function(that){
        return function(){
          that.set("newName", "")
        }
      }(this), function(that){
        return function(r){
          tag.rolledBack()
          tag.unloadRecord()
          that.set("errors", r.errors)
        }
      }(this))
    }
  }
```

tag 当我不管成功与失败template 多会加载这数据，我想在save失败不加载到template所以要加一个**rolledBack**和**unloadRecord**失败的时候就不加载了。


