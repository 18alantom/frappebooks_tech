#!/usr/bin/env sh

# abort on errors
set -e

yarn build

cd dist
cp index.html 404.html

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:18alantom/frappebooks_tech.git main:gh-pages

cd -
