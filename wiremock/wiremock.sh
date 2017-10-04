#!/bin/bash

if [ -z "$1" ]
  then
    cd /opt/wiremock
else
    cd $1
fi

echo "Running wiremock server from path: "`pwd`
java -jar /opt/wiremock/wiremock-standalone-2.8.0.jar --port 9999 --global-response-templating
