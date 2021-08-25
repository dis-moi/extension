#!/bin/bash
cd DisMoi
git init
git remote add origin git@github.com:dis-moi/extension-safari.git
git fetch
git reset origin/main
git checkout -t origin/main
git add .
git config --global user.name "bullito"
git config --global user.email "bully@dismoi.io"
git commit -m "update build"
git push origin HEAD
