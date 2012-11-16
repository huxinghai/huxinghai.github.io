---
layout: post
title: "octopress 添加theme 与 comments"
date: 2012-11-15 18:41
comments: true
categories: 部署
---
<p>
    添加theme步骤如下: <br />
    首先到<a href='https://github.com/imathis/octopress/wiki/3rd-Party-Octopress-Themes'>github</a>选择主题<br />
    <pre>
        cd octopress
        $ git clone GIT_URL .themes/THEME_NAME
        $ rake install['THEME_NAME']
        $ rake generate
    </pre>
    <br />
    添加comments步骤如下: <br />
    到<a href="http://disqus.com/">disqus</a>注册帐户<br />
    然后打开”_config.yml”，找到了disqus相关的配置项，修改即可<br />
    <pre>
        disqus_short_name: your_disqus_short_name
        disqus_show_comment_count: true
    </pre>
</p>
