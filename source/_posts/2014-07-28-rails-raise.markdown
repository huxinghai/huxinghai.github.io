---
layout: post
title: "ruby根据不同的异常处理不同事件"
date: 2014-07-28 23:39
comments: true
categories: ruby
---

在一个*class*里面你想根据不同的异常回调不同事件

		
		class NoMoneyException < StandardError
		end

		class ValidNumberException < StandardError
		end

		class Sale

			def self.create(options)
				obj = new(options)
				obj.validation
			end

			def validation

				raise NoMoneyException if money > current_user.money
				raise ValidNumberException if number > warehouse.nventory
			end
		end


		begin
			Sale.create({...})
		rescue NoMoneyException => e
			callback ..
		rescue ValidNumberException => e
			callback ..
		end



