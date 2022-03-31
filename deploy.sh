#!/usr/bin/env sh
git pull
git add .
git commit -m '更新'
git push -f https://github.com/Dilomen/Blog.git master
# 确保脚本抛出遇到的错误
set -e 

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

echo "### 欢迎访问 https://www.dilomen.com" > README.md

# 如果是发布到自定义域名
echo 'www.dilomen.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<your_token>@<USERNAME>.github.io
# git push -f https://github.com/Dilomen/Dilomen.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@e.coding.net:dilomen/dilomen.page.me.git master
set -e 

# cd -

# expect -c "
#     spawn scp -r -P 22 docs/.vuepress/dist root@118.89.19.172:/home/blog/
#     expect {
#       \"yes/no\" {send \"yes\r\"; exp_continue;}
#       \"*assword\" {set timeout 2000; send \"ZHAOJIEFENG*0312\r\"; exp_continue;}
#     }
# expect eof"