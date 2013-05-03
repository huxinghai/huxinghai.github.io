---
layout: post
title: "requirejs 使用"
date: 2013-04-19 22:59
comments: true
categories: javascript
---
<a href='http://requirejs.org/'>requirejs</a>是一个管理js模块加载与依赖包，可以不使用script标签来加载js文件<br />
1.引用requirejs文件<br />
<pre>
    <script data-main="scripts/main" src="scripts/require.js"></script>
</pre>

2.配置
<pre>
    requirejs.config({
        
        //默认加载模块路径
        baseUrl: "js/lib"

        //指定模块的路径
        paths:{            
            //前面别名， 后面路径
            "jquery" : "js/core/jquery.2.0.js",
            "backbone" : "js/core/backbone0.9.js",
            "underscore": "js/core/underscore.js"
        }

        //设置依赖关系
        shim:{
            backbone:{
                deps:["underscore", "jquery"],
                //可以使用全局别名
                exports: "Backbone"       
            }
        }
    })
    <a href='http://requirejs.org/docs/api.html#config'>更多配置</a>
</pre>
3.使用
<pre>
    // js/dom.js
    define(["backbone"], function(Backbone){
        LoginView = Backbone.View.extend({
            ...
        });
        return LoginView        
    })

    require(["js/dom"], function(LoginView){
        new LoginView(
            ...
        )
    })
</pre>