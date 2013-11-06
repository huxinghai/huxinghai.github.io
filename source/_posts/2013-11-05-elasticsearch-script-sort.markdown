---
layout: post
title: "elasticsearch脚本排序"
date: 2013-11-05 09:37
comments: true
categories: elasticsearch
---
由于自己要自定义score, 所以才会使用script来写复杂的sort

####javascript script 排序

- 安装 [elasticsearch-lang-javascript](https://github.com/elasticsearch/elasticsearch-lang-javascript)

```bash
bin/plugin -install elasticsearch/elasticsearch-lang-javascript/1.4.0
```

- 写js脚本

在你的配置目录下新建文件scripts/products/sort.js, 我的配置目录是*/etc/elasticsearch*,简单实例:

```js
(function(){
  doc._score.value + doc.likes.value
})()
```

- 查询

```bash
curl -XGET 'http://localhost:9200/products/_search?pretty' -d '{
  "query": {
    "custom_score": {
      "script": "global_product",
      "query": {
        "filtered": {
          "filter": {
            "and": [
              {
                "term": {
                  "_type": "product"
                }
              }
            ]
          }
        }
      }
    }
  },
  "sort": [
    {
      "_score": "desc"
    }
  ]
}'
```
products_sort: products是目录sort脚本文件名

#### native script 排序

- 案例

  [官方example](https://github.com/imotov/elasticsearch-native-script-example)

  [自己写了个简单的排序](https://github.com/huxinghai1988/sort-score-script)

- 查询

```bash
curl -X GET 'http://localhost:9200/products/_search?pretty' -d '{
  "query": {
    "custom_score": {
      "script": "productSort",
      "lang": "native",
      "query": {
        "filtered": {
          "filter": {
            "and": [
              {
                "term": {
                  "_type": "product"
                }
              }
            ]
          }
        }
      }
    }
  },
  "sort": [
    {
      "_score": "desc"
    }
  ]
}'
```


js与native排序，性能方面有差距同样的5W数据,比较一下查询速度：
  js：70ms, native: 20ms









