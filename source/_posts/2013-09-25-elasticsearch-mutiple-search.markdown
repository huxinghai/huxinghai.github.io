---
layout: post
title: "elasticsearch 多个索引查询，根据不同类型条件判定"
date: 2013-09-25 09:18
comments: true
categories: elasticsearch
---

### CURL

```SHELL
curl -XGET 'http://localhost:9200/indexA,indexB/_search?pretty=1' -d '{
"query" : {
    "bool": {
      "should": [{
        "filtered": {
          "filter":{
            "and": [
              {
                "range":{
                  "start_time":{
                    "lte": "2013-09-24T00:00:00+08:00"
                  }
                }
              },{
                "range": {
                  "end_time": {
                    "gt": "2013-09-24T00:00:00+08:00"
                  }
                }
              },
              {
                "term": {
                  "_type": "TypeA"
                }
              }]
          }
        }
      },{
        "filtered": {
          "filter": {
            "term": {
              "_type": "TypeB"
            }
          }
        }
      }]
    }
  },
  "sort": [
    {
      "_script": {
        "script": "doc[\u0027score\u0027].value/((time()-doc[\u0027start_time_ms\u0027].value) / 3600)",
        "type": "number",
        "order": "desc"
      },
      "_score": {

      }
    }
  ]
}'
```
indexA 与 indexB 索引的 TypeA与TypeB

#### ruby gem  Tire
```RUBY
Tire.search ['indexA', 'indexB'] do
  from _from
  size _size

  query do
    boolean do
      should do
        filtered do
          filter :range, :end_time => {gt: toDay}
          filter :range, :start_time => {lte: toDay}
          filter :term, :_type => "TypeA"
          filter :term, :status => 1
          filter :terms, {"category.id" => category_ids} if q[:catalog_id].present?
        end
      end
      should do
        filtered do
          filter :term, {:_type => "TypeB"}
        end
      end

    end
  end

  sort("_script" => {
    :script => "doc['score'].value/((time()-doc['start_time_ms'].value) / 3600)",
    :type   => "number",
    :order  => "desc"
  }, "_score" => {})

end
```