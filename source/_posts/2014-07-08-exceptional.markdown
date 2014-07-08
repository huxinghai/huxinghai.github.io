---
layout: post
title: "异常平台 exceptional"
date: 2014-07-08 22:21
comments: true
categories: 工具
---
visit: [官网](https://www.exceptional.io)

一个不错的统计项目的出错请求,而且支持多种语言，但是不是免费($9/month)

### Rails 使用方式

1. 在Gemfile配置
      
        gem exceptional

2. 打包
        
        bundle install

3. 生成exceptional的配置文件
        
        #YOUR-API-KEY 你申请的key
        bundle exec exceptional install YOUR-API-KEY



