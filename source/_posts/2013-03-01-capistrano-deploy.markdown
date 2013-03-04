---
layout: post
title: "centOS rails + nginx + rvm  + capistrano + passenger + git  部署"
date: 2013-03-01 23:24
comments: true
categories:  部署
---
所谓自动化部署<br />
步聚如下：<br />

1.在项目gemfile文件加入如下gem包，然后<code>bundle</code><br />
<pre>
    gem rvm-capistrano
    gem passenger
</pre>

2.然后执行<code>capify .</code>命令，生成两个文件路径如下<br />
<pre>
    config/deploy.rb

    Capfile
</pre>

3.配置deploy.rb文件，如下<br />
<pre>
    #设置应用名称
    set :application, "dom1"
    #服务登陆用户与密码
    set :user,"root"
    set :password,"321654"
    #项目仓库地址
    set :repository,  "git@github.com:huxinghai1988/capistrano_dom"
    #服务地址
    set :domain,"192.168.2.27"

    #设置伪登陆
    default_run_options[:pty] = true 

    #设置权限
    set :use_sudo,false
    #使用git更新代码也可以使用svn
    set :scm, "git"
    #git用户名
    set :scm_user,"root"
    #git密码
    set :scm_passphrase,"123456"
    #部署服务器位置
    set :deploy_to,"/var/www/#{application}"
    #部署分支
    set :branch, "master"
    #产品模式
    set :rails_env, 'production'

    # Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`


    role :web, domain                          # Your HTTP server, Apache/etc
    role :app, domain                         # This may be the same as your `Web` server
    role :db,  domain, :primary => true      # This is where Rails migrations will run

    #rvm 安装路径与 ruby版本
    set :rvm_path,"/usr/local/rvm"
    set :rvm_bin_path,"/usr/local/rvm/bin"
    set :rvm_ruby_string,'ruby-1.9.2'

    require 'rvm/capistrano'
    require 'bundler/capistrano'

    #deploy:setup前安装rvm与ruby
    before 'deploy:setup' do
        run 'echo insecure > ~/.curlrc', :shell => 'bash -c'
        find_and_execute_task "rvm:install_rvm"
        find_and_execute_task 'rvm:install_ruby'
    end

    #可以在发布后设置上传目录
    after 'deploy' do
        run "mkdir -p #{release_path}/public/uploads"        
        run "ln -nfs #{shared_path}/user #{release_path}/public/uploads"
        run "chown -R nobody:nobody #{release_path}/public/uploads"    
    end


    load 'deploy/assets'
</pre>

4.执行<code>cap deploy:setup</code>可以运行<code>cap -T</code>查看所有命令

5.安装完之后，执行<code>cap deploy</code>部署

6.成功部署后，到服务器安装nginx与passenger<br />
<pre>
    passenger-install-nginx-module
</pre>
出现如下选择<br />
<pre>
    1.Yes: download, compile and install Nginx for me. (recommended)
    The easiest way to get started. A stock Nginx 1.0.10 with Passenger
    support, but with no other additional third party modules, will be
    installed for you to a directory of your choice.

    2.No: I want to customize my Nginx installation. (for advanced users)
    Choose this if you want to compile Nginx with more third party modules
    besides Passenger, or if you need to pass additional options to Nginx's
    'configure' script. This installer will 1) ask you for the location of
    the Nginx source code, 2) run the 'configure' script according to your
    instructions, and 3) run 'make install'.

    Whichever you choose, if you already have an existing Nginx configuration file,
    then it will be preserved.

    Enter your choice (1 or 2) or press Ctrl-C to abort: 这里建议选择1

    当询问nginx的安装路径的时候，个人建议安装默认，安回车就行了
    Please specify a prefix directory [/opt/nginx]: 
</pre>

当安装完成后，会在console中提示如何配置Nginx<br />
Passenger会自动帮你将下面两行添加到Nginx的配置文件中/opt/nginx/conf/nginx.conf（很人性化）<br />

<pre>
    http {
        ...
        passenger_root /Users/Daniel/.rvm/gems/ruby-1.9.3-p374/gems/passenger-3.0.19;
        passenger_ruby /Users/Daniel/.rvm/wrappers/ruby-1.9.3-p374/ruby;
        ...
    }
</pre>

6.设置nginx.conf的静态目录,root参数指定到项目的public目录
<pre>
    server {
        listen 80;
        server_name www.yourhost.com;
        root /var/www/dom1/current/public;   # <--- be sure to point to 'public'!
        passenger_enabled on;
    }
</pre>
整体nginx.conf配置如下：<br />
<pre>
    user  root;
    worker_processes  1;

    events {
        worker_connections  1024;
    }


http {
    passenger_root /Users/Daniel/.rvm/gems/ruby-1.9.3-p374/gems/passenger-3.0.19;
    passenger_ruby /Users/Daniel/.rvm/wrappers/ruby-1.9.3-p374/ruby;

    autoindex on;
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;
    server {
        listen       80;
        server_name  test1.local;
        passenger_enabled on;
        rails_env production;

        location / {
            passenger_enabled on;
            rails_env production;
            root   /var/www/dom1/current/public;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}
</pre>
7.重新运行
<pre>
    killall nginx           #杀死所有nginx进程
    /opt/nginx/sbin/nginx   #启动nginx
</pre>