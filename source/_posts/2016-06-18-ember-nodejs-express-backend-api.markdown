---
layout: post
title: "ember使用express做后台API服务"
date: 2016-06-18 15:00
comments: true
categories: emberjs
---

使用Ember CLI的```ember generate server```命令创建server,模块会生成```server/index.js```文件，该服务是基于Express框架

    ember generate server


server/index.js默认内容

    module.exports = function(app) {
      var globSync   = require('glob').sync;
      var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
      var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

      // Log proxy requests
      var morgan  = require('morgan');
      app.use(morgan('dev'));

      mocks.forEach(function(route) { route(app); });
      proxies.forEach(function(route) { route(app); });

    };

从内容分析可以看出，其实这个服务可以让前端更好的mock API的数据做测试，这样在工作配合上前端不需要等后端API调式
可以使用server模拟数据；

也可以自定义API数据接口

    // server/index.js
    var bodyParser = require('body-parser');

    module.exports = function(app) {

      app.use(bodyParser.json({ type: "application/json" }));

      app.get('/api/items/:item', function(req, res) {
        const item = localdb.find('item', req.params.item);
        res.send({ item: item });
      });
    }


运行服务
    
    ember server

我们就可以通过``http://localhost:4200/api/items/1``API获取数据


