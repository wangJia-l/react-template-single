#!/bin/bash
# cd $(dirname $0)
# 编译集群提供了node环境，直接使用即可（其他版本：http://wiki.baidu.com/pages/viewpage.action?pageId=480000071）
export PATH=$NODEJS_BIN_LATEST:$PATH
npm install --registry "http://registry.npm.baidu-int.com"
echo '--install finish--'
###########################################
# 此处为你编译前端代码的脚本内容，用户需要自己写#
###########################################

# 执行编译命令，先编译出dist文件
echo '--build start--'
npm run build
echo '--build end--'

# 在build.sh脚本里如下代码，将前端编译产出的内容组装成jarvis要求的 archer3 包结构
echo '--start pack tar--'
[ -d output ]; rm -rf output
mkdir -p output/app_script_static

# 将前端代码build 产出的内容移动到 output 文件夹，建议放到app_script_static 文件夹,此处xxx为build编译产出的内容所在文件夹
cp -r dist/*  output/app_script_static

# 获取jarvis bin 、noahdes 文件，这两个文件夹里的脚本不允许修改
wget -O - --header "IREPO-TOKEN:7a6dedbd-1431-4c67-b2e5-6387c76636e0" "http://irepo.baidu-int.com/rest/prod/v3/baidu/ebiz/cpdinf-deps/releases/1.0.54.1/files?m=baidu/ebiz/cpdinf-deps" | tar -zxOf - './output/archer3-emcnginx.tar.gz' | tar zx -C output || exit 3 ;[ -d "output/bin" ] && [ -d "output/noahdes" ] || exit 1

# bin 文件夹cut_nginx_log.sh 脚本负责切分access.log 和 error.log 允许用户根据自己需要自定义。
# 如果需要自定义cut_nginx_log.sh 脚本，此处将你自定义的 cut_nginx_log.sh 脚本移入 bin 文件夹  cp custom_script/cut_nginx_log.sh output/bin
# bin 文件夹setenv.sh 用户可以用于自定义健康检查接口 cp custom_script/setenv.sh output/bin
# 此处custom_script为存放该应用自定义脚本的文件夹
cp build/setenv.sh output/bin
cp build/cut_nginx_log.sh output/bin

# 用户必须定义nginx.conf.template 文件内容，并且放到nginxconf文件夹
# jarvis 启动服务时将该nginx.conf.template模板文件内容替换环境变量之后作为 nginx.conf文件
mkdir -p output/nginxconf
cp build/nginx.conf.template output/nginxconf
[ -f "output/nginxconf/nginx.conf.template" ] || exit 1

# 如下tar.gz 名称替换为该应用在jarvis 上的应用名
tar zcf output/xcloud-turbo.tar.gz -C output bin noahdes app_script_static nginxconf
rm -rf output/bin output/lib output/noahdes output/app_script_static output/nginxconf

echo '--finish pack tar--'