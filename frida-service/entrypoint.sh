#!/bin/bash

echo "Starting the ADB server and attempting to connect to emulator ..."

# Number of retries and delay between retries
MAX_RETRIES=10
RETRY_DELAY=20

# Attempt to connect to ADB, retrying if it fails
for i in $(seq 1 $MAX_RETRIES)
do
    adb connect 127.0.0.1:5555
    connected=$(adb devices | grep '127.0.0.1:5555')

    if [ -n "$connected" ]; then
        echo "ADB connected successfully on attempt $i."
        break
    else
        echo "Attempt $i: ADB not connected. Retrying in $RETRY_DELAY seconds..."
        sleep $RETRY_DELAY
    fi
done

# Final check to ensure connection was successful before proceeding
connected=$(adb devices | grep '127.0.0.1:5555')
if [ -z "$connected" ]; then
    echo "Failed to connect to ADB after $MAX_RETRIES attempts."
    exit 1
fi

echo "Starting the Node.js service..."
node /opt/fridaService.js
