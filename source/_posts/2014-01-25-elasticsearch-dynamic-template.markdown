---
layout: post
title: "elasticsearch 动态加载属性的mapping"
date: 2014-01-25 15:13
comments: true
categories: elasticsearch
---
代码示例:


```bash
  curl -XPUT 'localhost:9200/products' -d '{
    "settings": {
      "analysis": {
        "analyzer": {
          "pinyin_analyzer": {
            "tokenizer": "my_pinyin",
            "filter": ["standard", "nGram"]
          }
        },
        "tokenizer": {
          "my_pinyin": {
            "type": "pinyin",
            "first_letter": "prefix",
            "padding_char": ""
          }
        }
      }
    },
    "mappings": {
      "product": {
        "dynamic_templates": [
          {
            "property_template": {
              "path_match": "properties.*",
              "mapping": {
                "type": "multi_field",
                "fields": {
                  "{name}": {
                    "type": "string",
                    "analyzer" : "pinyin_analyzer",
                    "boost": 10,
                    "store": "no",
                    "term_vector": "with_positions_offsets"
                  },
                  "{name}_untouched": {
                    "type": "string",
                    "index": "not_analyzed"
                  }
                }
              }
            }
          }
        ]
      }
    }
  }'

  curl -XPOST 'localhost:9200/products/product' -d '{name: "加多宝", properties: {ping: 1} }'
  curl -XPOST 'localhost:9200/products/product' -d '{name: "水杯", properties: {ge: 1} }'

  curl -XGET 'localhost:9200/products/product/_mapping?pretty'
```