#!/bin/bash

set -e

echo "Starting the ADB server ..."

adb connect 127.0.0.1:5555 && \
node /opt/fridaService.js
