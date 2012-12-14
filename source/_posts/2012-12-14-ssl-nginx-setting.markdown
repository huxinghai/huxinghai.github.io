---
layout: post
title: "nginx 配置ssl"
date: 2012-12-14 17:41
comments: true
categories: 部署
---

将申请的证书与私key放到nginx的conf目录里面然后，配置nginx.conf文件，如下:
<per>
server {
    listen       443;
    server_name  localhost;

    ssl                  on;
    ssl_certificate      /**/nginx/conf/ssl.crt;
    ssl_certificate_key  /**/nginx/conf/ssl.key;

    ssl_session_timeout  5m;

    ssl_protocols  SSLv2 SSLv3 TLSv1;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers   on;

    location / {
        root   /var/www/neza/current/public;
        passenger_enabled on;
        rails_env production;
        index  index.html index.htm;
    }
}
</per>
然后可以通过https访问了,如果你想把80端口转到443的话加在nginx.conf的80端口的server下面添加如下代码：
<per>
	rewrite ^(.*) https://$server_name$1 permanent;
</per>
