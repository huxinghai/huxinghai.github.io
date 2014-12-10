---
layout: post
title: "ruby bundle gem的配置"
date: 2014-12-10 14:11
comments: true
categories: gem 
---
在项目里我们用的比较多的bundle install当遇到一些gem包环境问题时，在安装gem时需要加一些配置
比如：

	gem install pg -v '0.12.0' -- --with-pg-config=/usr/pgsql-9.1/bin/pg_config

但是当我们要把pg加入Gemfile文件时，后面的配置怎么设置，这个时候我们要用到bundle config的东西，可以在bundle
读取相应的配置, 我们可以如下设置：

	bundle config build.pg --with-pg-config=/usr/pgsql-9.1/bin/pg_config


bundle config 详解：
	
	#查看配置
	bundle config

	#查看某种name的配置
	bundle config NAME

	#设置值
	bundle config NAME VALUE

	#设置全局
	bundle config --global NAME VALUE

	#设置当前目录下
	bundle config --local NAME VALUE 

	#删除一个配置
	bundle config --delete NAME
