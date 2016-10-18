---
layout: post
title: "ruby链式调用安全符号(&.)"
date: 2016-10-18 22:21
comments: true
categories: ruby
---
> Ruby-2.3.0版本添加安全操作符``&``, 其实我们之前可能是用``try``处理这种安全调用，但毕竟try是依赖Rails的ActiveSupport Module，&与try之间还是有些区别的;

#### 使用场景

在代码中我们防止nil对象调用报错，我们一般会使用下面这样的逻辑判断来避免错误
    
```ruby
if account && account.owner && account.owner.address
...
end
```

如果我们includes ActiveSupport我们会这样调用

```ruby
if account.try(:owner).try(:address)
...
end
```

使用&符号

    account&.owner&.address

其实&与try区别在于&前面方法返回nil就会终止链式调用, try则是检测最后的方法是否存在如果不存在就返回nil

```ruby
account = Account.new(owner: Object.new)
account.owner.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>

account && account.owner && account.owner.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>`

account.try(:owner).try(:address)
# => nil

account&.owner&.address
# => NoMethodError: undefined method `address' for #<Object:0x00559996b5bde8>`
```
