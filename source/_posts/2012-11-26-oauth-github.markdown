---
layout: post
title: "使用oauth2登陆github"
date: 2012-11-26 20:32
comments: true
categories: ruby
---
贴代码：
<pre>
require 'oauth2'

module Login
    class Github      
        def initialize(config)
            @config = config
        end
        
        #登陆第三方认证
        def authorize_url               
            @client = OAuth2::Client.new(*client_params)
            @client.auth_code.authorize_url(author_params)
        end

        #获取认证返回值        
        def get_access_token(params)
            @github = @client.auth_code.get_token(
                params[:code], 
                :state => params[:state], 
                :redirect_uri => @config['callback'])
            @to_ken = @github.token
            @github
        end

        #获取用户信息
        def get_userinfo                
            return {} if @to_ken.nil? || @github.nil?                
            response = @github.get(@config["userinfo_url"], :params => { :access_token => @to_ken })                                
            JSON.parse(response.body)
        end

        private 
        def client_params
            [
                @config['app_key'], 
                @config['app_secret'], 
                @config['options'].symbolize_keys
            ]
        end

        def author_params
            {
                :client_id => @config['app_key'],
                :redirect_uri => @config['callback'],
                :scope => @config['scope'],
                :state => @config['state']
            }
        end
    end
end
</pre>  
   使用如下:
<pre>
    oauth = Login::Github.new(
        :app_key => "*********",
        :app_secret => "***********************",
        :options => {
            site: "https://github.com"
            authorize_url: "/login/oauth/authorize"
            token_url: "/login/oauth/access_token"
        },
        :callback => "http://localhost:3000/users/github_callback",
        :scope => "no scope",
        :state => "456789",
        :userinfo_url => "https://api.github.com/user"
    )

    #跳转到第三方认证
    redirect_to oauth.authorize_url   
    
    #认证成功回调 github_callback 这个方法
    #例如:

    def github_callback
        oauth.get_access_token(params)            
        oauth.get_userinfo
    end
</pre>     