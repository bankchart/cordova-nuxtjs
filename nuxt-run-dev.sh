#!/bin/bash

export NUXT_ENV=LOCAL

cat "cordova/environment/${NUXT_ENV,,}.json" > nuxtjs/environment.json || exit;

npm run dev --prefix nuxtjs
