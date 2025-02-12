#!/bin/bash

# Number of emulators
NUM_EMULATORS=$1
START_PORT=5554

# Start the docker-compose file
cat <<EOF > docker-compose.yml
version: "3.9"
services:
EOF

# Loop through and generate emulator services
for ((i=1; i<=NUM_EMULATORS; i++))
do
  port_5554=$((START_PORT-1))
  port_5555=$((START_PORT-2))
  
  cat <<EOF >> docker-compose.yml
  android-emulator-$i:
    build:
      context: ./docker-android
    ports:
      - $port_5554:5554
      - $port_5555:5555
    privileged: true
    tty: true
    stdin_open: true
    volumes:
      - ./docker-android/keys/adbkey:/root/.android/adbkey:ro
      - ./docker-android/keys/adbkey.pub:/root/.android/adbkey.pub:ro
      - ./docker-android/android_avd_$i:/data
    devices:
      - /dev/kvm:/dev/kvm
    extra_hosts:
      - "host.docker.internal:host-gateway"
    networks:
      - android-net
    hostname: android-emulator-$i
    healthcheck:
      test: [ "CMD", "adb", "wait-for-device" ]
      interval: 5m
      timeout: 10s
      retries: 10
      start_period: 5m
EOF

  # Increment port for the next emulator
  START_PORT=$((START_PORT-2))

  # Add the depends_on condition if it's not the first emulator
  if ((i > 1)); then
    echo "    depends_on:" >> docker-compose.yml
    echo "      android-emulator-$((i-1)):" >> docker-compose.yml
    echo "        condition: \"service_healthy\"" >> docker-compose.yml
  fi

done

# Add frida-service to the end
cat <<EOF >> docker-compose.yml
  frida-service:
    build:
      context: ./frida-service
    environment:
      - NUM_EMULATORS=$NUM_EMULATORS
    ports:
      - 3000:3000
    depends_on:
EOF

# Add all emulators as dependencies for frida-service
for ((i=1; i<=NUM_EMULATORS; i++))
do
  echo "      android-emulator-$i:" >> docker-compose.yml
  echo "        condition: \"service_healthy\"" >> docker-compose.yml
done

cat <<EOF >> docker-compose.yml
    networks:
      - android-net

networks:
  android-net:
    driver: bridge
EOF

echo "docker-compose.yml generated for $NUM_EMULATORS emulators."
