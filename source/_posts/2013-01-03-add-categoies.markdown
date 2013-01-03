---
layout: post
title: "blog显示所有分类 "
date: 2013-01-03 19:28
comments: true
categories: jekyll
---

在自己的 blog显示所有分类,但是有个问题没有解决中文分类，出现编码问题！<br />

<code>source/_includes/custom/header.html</code>
文件加如下代码:<br />

{% raw %}
    {%  for key in site.categories %}
        <a href="/blog/categories/{{ key[0] }}">{{ key[0] }}</a>
    {% endfor %}
{% endraw %}
