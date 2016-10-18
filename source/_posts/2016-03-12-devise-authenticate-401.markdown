---
layout: post
title: "devise warden报错401"
date: 2016-03-12 23:41
comments: true
categories: gem devise
---
今天遇到一个特别的问题在项目里面使用devise应用到User与Admin, 因为User是可以用手机号码和Email登录的,
而Admin只能邮件登录，结果User可以正常登录，但是Admin应该也可以正常登录，但是就是报401密码错误，经过翻看源码发现一个很好的工具，找到出现问题的原因

    (byebug) Devise::Models.check_fields!(Admin)
    *** Devise::Models::MissingAttribute Exception: The following attribute(s) is (are) missing on your model: phone


因为我在devise.rb配置了

    config.authentication_keys = [:email, :phone]


所以我要在Admin模型里面指定authentication_keys

    devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:email]

