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
            @github = @client.auth_code.get_token(params[:code], :state => params[:state], :redirect_uri => @config['callback'])
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
<p>    
   使用如下:
    <pre>        
    </pre> 
</p>