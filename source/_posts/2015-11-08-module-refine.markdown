---
layout: post
title: "元编程Ruby2.0 Module#refine"
date: 2015-11-08 00:00
comments: true
categories: ruby
---

没有看元编程第二版之前还不知道Module有***refine***特效，可以将一个class重新打开定义方法
然后使用using生效，这样不会影响原有class，下面我们看看这个案例：


    module FooBar
      refine String do
        def hello
          puts "#{self} says : Hello, world"
        end
      end
    end

    class Bar
      using FooBar
      attr_reader :user

      def initialize(user)
        @user = user
      end

      def say
        user.hello
      end
    end

    Bar.new('ruby').say
    String.new.say

String.new.say调用会报错， 因为say只在Bar类里面生效。