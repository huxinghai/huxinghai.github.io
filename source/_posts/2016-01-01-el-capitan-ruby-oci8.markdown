---
layout: post
title: "El Capitan ruby-oci8 2.1.4 安装报错"
date: 2016-01-01 16:31
comments: true
categories: gem ruby
---

升级MacOS El Capitan后安装oracle的ruby-oci8 2.1.4版本gem包报错信息如下

```
  Installing ruby-oci8 2.1.4 with native extensions

  Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

  /Users/huxinghai/.rvm/rubies/ruby-2.0.0-p643/bin/ruby -r ./siteconf20151231-1172-1r9gor0.rb extconf.rb
  checking for load library path...
  DYLD_LIBRARY_PATH is not set.
  checking for cc... ok
  checking for gcc... yes
  checking for LP64... yes
  checking for sys/types.h... yes
  checking for ruby header... ok
  Get the version of Oracle from SQL*Plus... 1120
  try  -I/opt/oracle/instantclient_11_2/rdbms/public
  checking for oci.h... no
  try  -I/opt/oracle/instantclient_11_2/rdbms/public -I/opt/oracle/instantclient_11_2/rdbms/demo
  checking for oci.h... no
  try  -I/opt/oracle/instantclient_11_2/rdbms/public -I/opt/oracle/instantclient_11_2/rdbms/demo -I/opt/oracle/instantclient_11_2/network/public
  checking for oci.h... no
  try  -I/opt/oracle/instantclient_11_2/rdbms/public -I/opt/oracle/instantclient_11_2/rdbms/demo -I/opt/oracle/instantclient_11_2/network/public -I/opt/oracle/instantclient_11_2/plsql/public
  checking for oci.h... no
  *** extconf.rb failed ***
  Could not create Makefile due to some reason, probably lack of necessary
  libraries and/or headers.
```  

这里面有一个重要的信息``DYLD_LIBRARY_PATH is not set``但是我在``~/.bash_profile``文件里面配置了DYLD_LIBRARY_PATH路径，我在终端``env | grep DYLD_LIBRARY_PATH``但是为空，后来我在终端``export DYLD_LIBRARY_PATH=/opt/oracle/instantclient_11_2``还是为空，但是export其它的环境变量都有值，后来查资料看到一个El Capitan SIP（System Integrity Protection）这个词，google了一个SIP才明白是El Capitan版本的一个安全策略, SIP把DYLD_LIBRARY_PATH保护起来了，所以的把SIP关闭才可以正常设置DYLD_LIBRARY_PATH, 关闭SIP后export DYLD_LIBRARY_PATH变量就成功了。

[如果关闭SIP](http://apple.stackexchange.com/questions/208478/how-do-i-disable-system-integrity-protection-sip-aka-rootless-on-os-x-10-11)