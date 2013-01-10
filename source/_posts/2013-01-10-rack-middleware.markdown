---
layout: post
title: "rack 与 rack middleware"
date: 2013-01-10 19:13
comments: true
categories: rack
---

在没有了解rack之前，大概知道是个中间组件没有详细的去了解它，今天花一点时间查了一下资料！<br />
这编文章讲的比较详细<a href='http://wp.xdite.net/?p=1557'>http://wp.xdite.net/?p=1557</a><br />

在项目执行<code>rake middleware</code>命令可以看到使用列表: <br />
<per>
    use ActionDispatch::Static
    use Rack::Lock
    use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x00000002164a70>
    use Rack::Runtime
    use Rack::MethodOverride
    use ActionDispatch::RequestId
    use Rails::Rack::Logger
    use ActionDispatch::ShowExceptions
    use ActionDispatch::DebugExceptions
    use ActionDispatch::RemoteIp
    use ActionDispatch::Reloader
    use ActionDispatch::Callbacks
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    use ActiveRecord::QueryCache
    use ActionDispatch::Cookies
    use ActionDispatch::Session::CookieStore
    use ActionDispatch::Flash
    use ActionDispatch::ParamsParser
    use ActionDispatch::Head
    use Rack::ConditionalGet
    use Rack::ETag
    use ActionDispatch::BestStandardsSupport
    run MysqlDom::Application.routes
</per>

中间件一些使用: 
<per>
    #添加中间件
    config.middleware.use(new_middleware, args)
    #添加新的中间件到指定的中间件堆栈中现有的中间件前
    config.middleware.insert_before(existing_middleware, new_middleware, args) 
    #添加新的中间件到指定的中间件堆栈中现有的中间件后
    config.middleware.insert_after(existing_middleware, new_middleware, args)
    #交换现有的中间件中间件
    config.middleware.swap ActionController::Failsafe, Lifo::Failsafe
    #删除中间件
    config.middleware.delete(middleware)
    #清空中间件
    config.middleware.clear
</per>
