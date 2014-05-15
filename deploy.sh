#!/bin/sh

grunt sass:prod
grunt browserify2:prod
git push heroku react-switch:master
