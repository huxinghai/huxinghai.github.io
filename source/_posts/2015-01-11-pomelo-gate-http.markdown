---
layout: post
title: "使用pomelo做聊天服务器分配connector服务使用http分配"
date: 2015-01-11 10:10
comments: true
categories: nodejs
---

如果使用pomelo默认的gate分配很慢, 因为socket去连接服务，然后disconnect再连接connector
服务器这过程就会拖慢用户连接时间，使用http方便而且快。

pomelo 本身支持Plugin扩展，已经有人用express写了(pomelo－http)[https://github.com/pipi32167/pomelo-http-plugin]插件了, 插件存在一个问题定义post请求拿不到参数, *body-parser*使用可以解决这个问题。

```js
var dispatcher = require('../../../util/dispatcher');

module.exports = function(app, http){
  http.get("/system/dispatcher", function(req, res){

    var c_type = req.query.c_type,
      uid = req.query.uuid;

    c_type = (c_type && c_type==='mqtt') ? 'mqtt-connector' : 'sio-connector'
    
    var connectors = app.getServersByType(c_type);
    var s = dispatcher.dispatch(uid, connectors);
    if(!s){
      res.status(403).json({error: "not invalid server connectors!!!"})
    }else{
      res.json({host: s.host, port: s.clientPort});
    }
  })
}
```
