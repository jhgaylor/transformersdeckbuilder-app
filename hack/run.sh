#!/bin/bash

echo "Running the app at http://localhost:8080/"
docker run --rm -p 8080:80 cloudflinger/transformersdeckbuilder-app:latest
