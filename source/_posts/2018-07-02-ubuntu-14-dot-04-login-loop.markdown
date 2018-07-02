---
layout: post
title: "ubuntu-14.04 无法进入桌面，登录之后又跳回登录页面"
date: 2018-07-02 18:19
comments: true
categories: ubuntu linux
---
周末在家一台Acer笔记本电脑显卡Geforce GT 520m安装Ubuntu进行测试使用，但不料安装完环境重启系统之后图形桌面登录不进去，ssh 连接登录方式正常，从网上找了很多资料，包括重新安装显卡驱动、重新安装ubuntu-desktop、权限问题等，最终安装gnome-shell桌面环境解决，下面是处理步骤：

1. 重置主题管理工具unity先``sudo apt-get install unity-tweak-tool``然后再执行``unity-tweak-tool --reset-unity``
2. 查看登录用户的home目录.Xauthority与.ICEauthority文件是否所属登录所有，通过``chown username:username .Xauthority``变更
3. 安装新桌面环境``sudo apt-get install gnome-shell ubuntu-gnome-desktop``
4. 安装gdm登录管理器``sudo apt-get install gdm``然后再执行``sudo dpkg-reconfigure gdm``
5. 更新系统安装包``sudo apt-get update``然后升级系统``sudo apt-get dist-upgrade``