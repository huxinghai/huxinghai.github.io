---
layout: post
title: "nginx 配置ssl"
date: 2012-12-14 17:41
comments: true
categories: 部署
---

将申请的证书与私key放到nginx的conf目录里面然后，配置nginx.conf文件，如下:<br />
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

<a href="startssl.com">startssl</a>的根证书与sub class1的证书合并方法如下：
<per>
    wget https://www.startssl.com/certs/ca.pem
    wget https://www.startssl.com/certs/sub.class1.server.ca.pem
    cat ca.pem sub.class1.server.ca.pem >> ca-certs.crt
    cat ca-certs.crt >> your_server.crt
</per>

然后重启nginx出现如下错误：
<per>
    nginx: [emerg] SSL_CTX_use_certificate_chain_file("/opt/nginx/conf/ssh.crt") 
    failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line error:140DC009:SSL 
    routines:SSL_CTX_use_certificate_chain_file:PEM lib)
</per>
在网上查了一下错误，原因是合并证书出了一点问题,把 your_server.crt文件打开修改如下代码

<per>
    -----END CERTIFICATE----------BEGIN CERTIFICATE-----
</per>
改为
<per>
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
</per>
这样重启nginx的时候没有出错了，ok了