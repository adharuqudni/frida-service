#!/bin/bash

set -e

echo "Starting the ADB server ..."
adb -a -P 5037 server nodaemon && \

adb connect $ADB_HOST:$ADB_PORT && \
node /opt/fridaService.js
