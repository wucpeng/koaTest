#!/bin/bash

set +e

kill -9 `pgrep koaTest` > /dev/null 2>&1
> console.log
sleep 1
#NODE_ENV=production nohup node server.js > console.log 2>&1 &
NODE_ENV=dev nohup node server.js > console.log 2>&1 &
while true;
do
        ps -ax 2> /dev/null | grep koaTest | grep worker 1> ps.log
        if [ -n "`cat ps.log`" ]; then
                break
        else
                sleep 1
        fi
done
