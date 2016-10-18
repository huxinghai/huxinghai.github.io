---
layout: post
title: "Reverse Vowels of a String"
date: 2016-05-14 17:51
comments: true
categories: leetcode
---

Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:
Given s = "hello", return "holle".

Example 2:
Given s = "leetcode", return "leotcede".

```ruby
    # @param {String} s
    # @return {String}
    def reverse_vowels(a)
      tmp = a.length.times.inject([]) do |s, i| 
        /(a|e|i|o|u)/i =~ a[i] ? s << i : s
      end
      tmp.length.fdiv(2).ceil.times.each do |i| 
        v, b = tmp[i], tmp[tmp.length-1-i]
        a[v], a[b] = a[b], a[v] if v && b
      end
      a
    end
```    