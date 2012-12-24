---
layout: post
title: "错误的使用mongodb的mapReduce"
date: 2012-12-24 18:58
comments: true
categories: mongodb
---
使用mapReduce进行聚合，使用不当遇到的问题，本来一开始我是如下方式：

<per>
    map = function(){
        emit({
            product_id : this.product_id,
            store_id : this.store_id
        },{
            quantity : this.quantity,
            id : this._id
        })
    }

    reduce = function(key, values){
        var results = { quantity : 0, ids : []}
        values.forEach(function(val){
            results.quantity += val.quantity
            results.ids.push(val.id)
        })
    }

    db.transfers.mapReduce(map, reduce, {out: {inline : 1}})
</per>
问题来了，一个key的<code>reduce</code>返回结果ids与实际相差不符合！ 后来经过一翻折腾<br />
把代码改如下:<br />
<per>
    map = function(){
        emit({
            product_id : this.product_id,
            store_id : this.store_id
        },{
            quantity : this.quantity,
            ids : [this._id]
        })
    }

    reduce = function(key, values){
        var results = { quantity : 0, ids : []}
        values.forEach(function(val){
            results.quantity += val.quantity
            results.ids.concat(val.id)
        })
    }

    db.transfers.mapReduce(map, reduce, {out: {inline : 1}})
</per>
原因是<code>mapReduce</code>执行的时候不是一个key一次聚合完，而是分段聚合！