#!/bin/bash

echo "Starting the ADB server and attempting to connect to emulator ..."

# Number of retries and delay between retries
MAX_RETRIES=10
RETRY_DELAY=20

# Attempt to connect to ADB, retrying if it fails
for i in $(seq 1 $MAX_RETRIES)
do
    adb connect android-emulator-1:5555
    adb connect android-emulator-2:5555
    adb connect android-emulator-3:5555
    adb connect android-emulator-4:5555
    status=$(adb devices | grep 'android-emulator:5555' | awk '{print $2}')
    
   
    if [ "$status" == "device" ]; then
        echo "ADB connected successfully and device is ready."
        break
    elif [ "$status" == "offline" ]; then
        echo "ADB connected, but the device is offline. Retrying in $RETRY_DELAY seconds..."
    else
        echo "ADB not connected. Retrying in $RETRY_DELAY seconds..."
    fi
    sleep $RETRY_DELAY
done

# Final check to ensure connection was successful before proceeding
connected=$(adb devices | grep 'android-emulator:5555')
if [ -z "$connected" ]; then
    echo "Failed to connect to ADB after $MAX_RETRIES attempts."
    exit 1
fi

sleep 60

echo "Starting the Node.js service..."
node /opt/fridaService.js
