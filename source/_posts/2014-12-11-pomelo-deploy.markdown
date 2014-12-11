---
layout: post
title: "pomelo centOs 环境部署"
date: 2014-12-11 23:44
comments: true
categories: nodejs
---
由于pomelo 依赖node-gyp这modules所以有点麻烦,安装之前配置python环境，官方推荐版本2.7


	npm config set python /usr/local/bin/python2.7

	npm install -g node-gyp

	npm install -g pomelo 

	pomelo start -e production --daemon

	//host 与 port 是master地址
	pomelo stop --host 172.0.0.1 --port 4005

