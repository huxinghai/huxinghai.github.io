---
layout: post
title: "gem requirejs-rails assets precompile 简介"
date: 2013-06-22 00:13
comments: true
categories: ruby
---
安装[requirejs-rails](https://github.com/jwhitley/requirejs-rails), 然后新建配置文件`config/requirejs.yml`

requirejs.yml

```ruby
#配置单个模块，会编译一个单独的模块
modules:
  - name: 'mytoplevel'

#路径
paths
	jquery: "lib/jquery.js"

#设置依赖关系
shim:
```
其实与requirejs配置差不多，只是rails会根据requirejs.yml编译