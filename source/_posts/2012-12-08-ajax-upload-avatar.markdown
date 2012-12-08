---
layout: post
title: "mongoid 使用ajax 无刷新上传"
date: 2012-12-08 14:43
comments: true
categories: rails
---

使用以下的gem包:
<pre>
    gem 'carrierwave'
    gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'
    gem 'mini_magick'
    gem 'rack-raw-upload'
</pre>

<p>
然后前端js，本来使用<a href='http://fineuploader.com'>fineuploader</a>，但是在ie8下面有问题,原因是ajax send 的时候头部<br />
信息类型<code>Content-Type: multipart/form-data</code>,而其它浏览头部类型正常，但是官方说支持ie 7以上，但是弄了很久，还是不行<br />
决定使用<a href='https://github.com/Valums-File-Uploader/file-uploader.git'>file-uploader</a>前端，这使用方式很雷同，使用file-uploader在ie 8下面，但当服务器返回状态不等于200时，会出现错误，错误信息说iframe.contentDocument 没有权限！通过其它状态处理错误信息!
</p>