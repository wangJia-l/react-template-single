#!/bin/sh

DAYS=7
LASTHOUR=$(date -d "-1 hour" +"%Y-%m-%d-%H")

readonly PROJ_DIR=$(cd $(dirname $0)/../; pwd);
readonly NGINX_LOG_PATH="${PROJ_DIR}/log/nginx";

if [ ! -f $NGINX_LOG_PATH/nginx.pid ]; then
    echo "nginx already stopped "
    exit 0
fi

if [ ! -f $NGINX_LOG_PATH/access.log_$LASTHOUR ]; then
    echo "cutting log file at ${NGINX_LOG_PATH}"
    mv $NGINX_LOG_PATH/access.log  $NGINX_LOG_PATH/access.log_$LASTHOUR
    mv $NGINX_LOG_PATH/error.log  $NGINX_LOG_PATH/error.log_$LASTHOUR
    kill -USR1 `cat $NGINX_LOG_PATH/nginx.pid`
    find $NGINX_LOG_PATH/  -name "access.log_*" -type f -mtime +$DAYS -exec rm {} \;
    find $NGINX_LOG_PATH/  -name "error.log_*" -type f -mtime +$DAYS -exec rm {} \;
fi
