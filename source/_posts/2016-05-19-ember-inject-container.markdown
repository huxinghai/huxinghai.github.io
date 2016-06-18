---
layout: post
title: "ember容器注入对象"
date: 2016-05-19 22:31
comments: true
categories: emberjs
---
> Ember注入是用来将一个对象注入到一个容器里面去，让容器可以访问对象，容器是指``route``、``controller``、``helper``。

使用用例：

    // app/services/session.js
    export default Ember.Service.extend({
      isAuthenticated: false
    });

    // app/initializes/inject-session.js
    export function initialize(application) {
      application.inject('route', 'service:session');
    }

    export default {
      name: 'session',
      initialize: initialize
    }


    // app/routes/products.js
    export default Ember.Route.extend({

      model(){
        this.session
      },
      setupController(controller, model){
        this.session
        ...
      }
    });




