#!/bin/bash

export NUXT_ENV=DEVICE

npm run build --prefix nuxtjs

cd ./cordova && cordova build
