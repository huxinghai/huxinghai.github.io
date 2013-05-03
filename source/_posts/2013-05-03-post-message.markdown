---
layout: post
title: "postMessage 跨域通讯"
date: 2013-05-03 23:48
comments: true
categories: javascript
---
不相同的域可以相互通讯, 例如iframe与页面进行通讯, <a href='https://github.com/daepark/postmessage'>postMessage</a>是个封装不错的包<br />

简单实例解释
```js

  //在iframe 绑定频道
  pm.bind("message1", function(data) {
    $(document.body).append(JSON.stringify(data));
  });

  //发送消息
	pm({
    //给那个iframe
	  target: window.frames["example1"],
    //频道
	  type:"message1", 
    //内容
	  data:{hello:"world"}
	});

```