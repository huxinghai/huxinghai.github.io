---
layout: post
title: "ubuntu rabbitmq 服务器安装过程"
date: 2013-05-11 12:28
comments: true
categories: rabbitmq
---
rabbitmq是用于消息列队处理的,准备研究一下它来做消息处理
rabbitmq是用Erlang开发的,所有安装之前要部署Erlang环境

#### Erlang部署

    wget https://elearning.erlang-solutions.com/binaries/sources/otp_src_R16B.tar.gz
    tar xvzf otp_src_R16B.tar.gz
    cd otp_src_R16B
    ./configure
    make && make install

#### Rabbitmq部署
[官方安装文档](http://www.rabbitmq.com/install-debian.html)

1. 添加公共key

    wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc

    sudo apt-key add rabbitmq-signing-key-public.asc

2. 安装

    sudo apt-get install rabbitmq-server

[官方配置文档](http://www.rabbitmq.com/configure.html)配置文件路径在<code>/etc/rabbitmq/</code>

#### 启动rabbitmq_management管理

    cd /usr/lib/rabbitmq/lib/rabbitmq_server-2.7.1/sbin
    sudo ./rabbitmq-plugins enable rabbitmq_management

然后浏览地址<code>http://server-name:55672/</code>, 官方说3.0以下版本端口是55672