---
layout: post
title: "ruby 发送email"
date: 2012-11-20 19:10
comments: true
categories: ruby
---
前题是要安装<a href='https://github.com/mikel/mail'>smtp-tls</a>

<pre>
#encoding : utf-8
require 'rubygems'
require 'smtp-tls'
require 'net/smtp'

class LogMail
    def initialize(server_addr, port, domain, user_name, password)
        @server_addr = server_addr
        @port = port
        @domain = domain
        @user_name = user_name
        @password = password
    end

    def head(to, subject)
<<-EOF
From: kaka <#{@user_name}>
To: <#{to}>
Subject: #{subject}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=kaka
--kaka
EOF
    end

    def message(body)
<<-EOF
Content-Type: text/plain
Content-Transfer-Encoding:8bit

#{body}  
thank
--kaka
EOF
    end

    def attachment(attachment_path)
        if attachment_path.nil?
            return ""
        end
        
        attachment_content = nil
        attachment_content = [File.read(attachment_path)].pack("m") if File.exists?(attachment_path)        

        if attachment_content
<<-EOF
Content-Type: multipart/mixed; name=#{attachment_path}
Content-Transfer-Encoding:base64
Content-Disposition: attachment; filename=#{attachment_path}

#{attachment_content}
--kaka
EOF
        else
            puts "error: #{attachment_path} not exist?"
            return ""
        end
    end

    def sender(to, subject, body, attachment_path = nil)
        msgstr = head(to, subject) + message(body) + attachment(attachment_path)
        Net::SMTP.start(@server_addr, @port, @domain, @user_name, @password, :plain) do | smtp |
          smtp.send_message msgstr, @user_name, to
        end
    end
end

log_mail = LogMail.new("smtp.gmail.com", 587, "domain.com", "login", "password")
log_mail.sender("to@gmail.com", "subject", "body","attachment_path")
</pre>