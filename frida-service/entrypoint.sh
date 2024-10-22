#!/bin/bash

set -e

echo "Starting the ADB server ..."

adb connect $ADB_HOST:$ADB_PORT && \
node /opt/fridaService.js
