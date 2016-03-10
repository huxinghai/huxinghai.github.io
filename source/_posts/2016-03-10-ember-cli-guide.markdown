---
layout: post
title: "ember-cli入门指南"
date: 2016-03-10 23:02
comments: true
categories: emberjs
---

#### ember-cli是什么？
  ember-cli是一个ember.js提供的一个快速开发命令行工具，可以通过命令构建、运行、测试、部署，很方便
前后端分离，而且ember有很丰富的[addon](https://www.emberaddons.com/)生态社区，把重用的东西组件化，
项目开发完成用build命令会输出一个index.html和编译好的js、css文件这个输出就是静态的，我们可以用nginx或node express服务器来展现编译好的静态资源，其实ember-cli的命令行工具设计的跟Rails相似，addon就是ruby的gem包可能
是因为ember的开发也是Rails核心贡献开发，所以很多设计思想互通。


#### 命令介绍
  
    //构建项目
    $ ember new todo

    //运行项目
    $ ember s

    //生成路由
    $ ember generate route products/new

    //运行测试
    $ ember test

    //安装addon
    $ ember install <addon-name>

#### 目录结构

    app/    => 主要包含了models、controller、minxin、routes、template、index.html、application所有项目相关逻辑代码多会在这里面
    dist/   => 编译输出目录里面index.html和js、css
    public/   => 存放一些静态文件例如：图片、字体
    tests/    => 测试逻辑
    bower_components/    => bower包依赖源文件
    node_modules/     => npm包依赖源文件
    vendor/   => 自己扩展依赖
    ember-cli-build.js  => 指定编译配置文件
    bower.json   => bower依赖配置
    package.json    => npm依赖配置

#### bower与npm区别
  bower是管理前端库、npm是管理nodo开发使用库，前者是扁平化后者是树形结构。
