#!/bin/bash

set -e

adb connect $ADB_HOST:$ADB_PORT && \
node /fridaService.js
