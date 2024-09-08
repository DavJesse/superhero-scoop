#!/bin/sh
git add .
git commit -m "$1"
git push gitea "$2"
git push github "$2"