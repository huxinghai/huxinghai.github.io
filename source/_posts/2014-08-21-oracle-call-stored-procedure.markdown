---
layout: post
title: "Rails调用oracle的存储过程"
date: 2014-08-21 00:41
comments: true
categories: rails
---
调用方式如下：

	cursor = ActiveRecord::Base.connection.raw_connection.parse("BEGIN MYPROC(:age, :name, :fathers_age, :capital_name); END;")
	cursor.bind_param(:name, 'akshay')
	cursor.bind_param(:age, '20')
	cursor.bind_param(:fathers_age, nil, Fixnum)
	cursor.bind_param(:capital_name, nil, String, 20)
	cursor.exec()
	p cursor[:fathers_age], cursor[:capital_name]
	 
	 
	require 'sequel'
	db = Sequel.connect(:adapter=>'oracle', :host=>'localhost', :database=>'db_name', :user=>'test', :password=>'test')
	db.execute("begin MYPROC(:age, :name, :fathers_age, :capital_name); end;", {:arguments => [[20, "integer"], ["akshay", "string"], [nil, "integer"], [nil, "string"]]}) { |cursor| [cursor[3], cursor[4]] }
