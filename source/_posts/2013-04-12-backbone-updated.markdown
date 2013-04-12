---
layout: post
title: "backbone升级0.9.9版本，添加两个方法listenTo与stopListening"
date: 2013-04-12 23:35
comments: true
categories: backbone
---
listenTo用于绑定事件，stopListening关闭绑定事件了<br />
它们与on有什么不同的呢！这里做个例子<br />
<pre>
  var Todo = Backbone.Model.extend({
    ...
  })
   
  var todo = new Todo()
  var appView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(todo, "change:name", this.edit_attr)
    },
    edit_attr: function(){
      this.$(".name").html(this.model.get('name'))
    }
  })

  var app_view = new appView()
  app_view.remove()  
</pre>
当我们<code>app_view.remove()</code>删除之后会自动执行<code>stopListening</code>方法关注绑定事件<br />
<code>todo</code>模型就不会有这个视图绑的事件了，如果<br />
<pre>
  this.listenTo(todo, "change:name", this.edit_attr)
</pre>
改用这种绑定方式
<pre>
  todo.on("change:name", this.edit_attr, this)
</pre>
<code>app_view.remove()</code>删除之后，todo模型还是会有这个绑定的事件<br />
当然也可以用off来处理，但是现在有listenTo就不用做特别的处理了。
