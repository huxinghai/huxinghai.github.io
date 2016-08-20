---
layout: post
title: "使用Ruby MonitorMixin注意的坑"
date: 2016-08-20 21:40
comments: true
categories: ruby
---

初次使用MonitorMixin控制同步执行的时候一不小心就踩坑了，当你include的时候如果你的class定义了initialize方法
请调用``super``否则会报``undefined method `lock' for nil:NilClass``错。

```ruby
    class Number
      attr_accessor :n

      include MonitorMixin

      def initialize(*args)
        @n = 0
        super() # 调用MonitorMixin#initialize
      end

      def increase(x)
        synchronize do 
          @n = @n + x
          puts("#{@n}, #{x}")
        end
      end
    end
```