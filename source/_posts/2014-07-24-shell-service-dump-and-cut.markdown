---
layout: post
title: "两个常用的shell脚本"
date: 2014-07-24 22:10
comments: true
categories: linux
---

1. 日志切割

		#!/bin/sh
		log_path="/home/littlefire/var/www/apps/littlefire/current/log"
		to_day=`date -d "yesterday" +"%Y%m%d"`
		cp ${log_path}/production.log ${log_path}/production_${to_day}.log
		echo "" > ${log_path}/production.log
		chown littlefire:littlefire ${log_path}/production.log
		bzip2 ${log_path}/production_${to_day}.log

2. mysql数据库定时备份
		
		#!/bin/sh
		#
		#发送Email的话要安装 mutt与msmtp才可以

		today=`date -d "today" +"%Y%m%d"`
		path=/home/kaka/data_backup/
		filename=backup_${today}.sql
		file_path=${path}${filename}
		tar_name=${path}backup_${today}.tar.gz
		/usr/bin/mysqldump -uroot -p** database_name > ${file_path}

		tar -zcvf $tar_name -C $path $filename
		rm $file_path
		find $path -mtime +6 -type f -name backup_*.tar.gz | xargs rm -rf 
		#echo "littefire data dump ${today}" | mutt -s "${today} dump data" ***@qq.com -a $tar_name