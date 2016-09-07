---
layout: post
title: "使用MySQL存储emoji表情符号"
date: 2016-09-05 22:40
comments: true
categories: Rails MySQL
---
一个emoji是4bytes的存储空间, 如果你的MySQL使用的是utf8编码格式那emoji符号存储将会截断字符因为utf8一个字符只是
3bytes的存储空间

例子：

```
mysql> SET NAMES utf8;
Query OK, 0 rows affected (0,00 sec)

mysql> INSERT INTO messages (message) VALUES ('What a nice emoji😀!');
Query OK, 1 row affected, 1 warning (0,00 sec)

mysql> SHOW WARNINGS;
+---------+------+---------------------------------------------------------------------------+
| Level   | Code | Message                                                                   |
+---------+------+---------------------------------------------------------------------------+
| Warning | 1366 | Incorrect string value: '\xF0\x9F\x98\x80!' for column 'message' at row 1 |
+---------+------+---------------------------------------------------------------------------+
1 row in set (0,00 sec)

mysql> SELECT message FROM messages;
+-------------------+
| message           |
+-------------------+
| What a nice emoji |
+-------------------+
1 row in set (0,00 sec)
```

使用utf8mb4格式可以存储emoji字符，但是[MySQL 5.5.3](https://dev.mysql.com/doc/relnotes/mysql/5.5/en/news-5-5-3.html)版本才引进utf8mb4编码格式，所以数据库要更新到这个版本或者更高的, 用utf8mb4之后我们经常会遇到``Mysql2::Error: Specified key was too long; max key length is 767 bytes``错误，这是因为Innodb的索引长度限制767bytes, (varchar(255) * 4bytes)这个是会超过767bytes


如果你的字段类型长度不能减少，那只能是指定行的格式来解决，在创建表时指定[ROW_FORMAT=DYNAMIC](http://dev.mysql.com/doc/refman/5.6/en/innodb-parameters.html#sysvar_innodb_large_prefix)参数可以从767bytes限制提升到3072bytes, 这样就是会牺牲一点空间

例如:

```sql
CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `site_info_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC
```


如果使用的是Rails的migration的话就如下：

```ruby
class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles, options: 'ROW_FORMAT=DYNAMIC' do |t|
      t.string :title, null: false, limit: 300
      t.datetime :published
      t.string :author
      t.text :description
      t.text :content

      t.timestamps
    end

    add_index :articles, :title, :unique => true
  end
end
```



