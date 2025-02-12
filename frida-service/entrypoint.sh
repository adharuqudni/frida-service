#!/bin/bash

echo "Starting the ADB server and attempting to connect to emulators ..."

# Number of retries and delay between retries
MAX_RETRIES=30
RETRY_DELAY=20

# Use the NUM_EMULATORS environment variable or default to 7 if not set
NUM_EMULATORS=${NUM_EMULATORS:-7}  # Default to 7 if not set

# Loop over the number of emulators
for i in $(seq 1 $NUM_EMULATORS)
do
    echo "Attempting to connect to android-emulator-$i:5555"
    adb connect "android-emulator-$i:5555"
done

# Attempt to connect to the last emulator first
for i in $(seq 1 $MAX_RETRIES)
do
    # Loop through all emulators and check connection status
    all_connected=true
    for i in $(seq 1 $NUM_EMULATORS)
    do
        status=$(adb devices | grep "android-emulator-$i:5555" | awk '{print $2}')
        
        if [ "$status" != "device" ]; then
            echo "ADB not connected to android-emulator-$i:5555. Retrying in $RETRY_DELAY seconds..."
            all_connected=false
            break
        fi
    done

    # If all emulators are connected, break out of the loop
    if [ "$all_connected" == true ]; then
        echo "ADB connected successfully to all devices."
        break
    fi

    sleep $RETRY_DELAY
done

# Final check to ensure connection was successful before proceeding
all_connected=true
for i in $(seq 1 $NUM_EMULATORS)
do
    connected=$(adb devices | grep "android-emulator-$i:5555")
    if [ -z "$connected" ]; then
        echo "Failed to connect to android-emulator-$i after $MAX_RETRIES attempts."
        all_connected=false
    fi
done

if [ "$all_connected" == false ]; then
    exit 1
fi

sleep 60

echo "Starting the Node.js service..."
node /opt/fridaService/fridaService.js
