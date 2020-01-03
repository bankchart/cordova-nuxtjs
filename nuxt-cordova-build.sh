#!/bin/bash

export NUXT_ENV=DEVICE-LOCAL

cat "cordova/environment/${NUXT_ENV,,}.json" > nuxtjs/environment.json || exit;

npm run build --prefix nuxtjs

cd ./cordova && cordova build
