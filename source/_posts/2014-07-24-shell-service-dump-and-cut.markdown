---
layout: post
title: "两个常用的shell脚本"
date: 2014-07-24 22:10
comments: true
categories: linux
---

1.日志切割

		#!/bin/sh
		log_path="/home/littlefire/var/www/apps/littlefire/current/log"
		to_day=`date -d "yesterday" +"%Y%m%d"`
		cp ${log_path}/production.log ${log_path}/production_${to_day}.log
		echo "" > ${log_path}/production.log
		chown littlefire:littlefire ${log_path}/production.log
		bzip2 ${log_path}/production_${to_day}.log