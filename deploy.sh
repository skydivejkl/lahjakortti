#!/bin/sh

set -eu

git remote add dokku dokku@termiikki.skydivejkl.fi:lahjakortti || true

git push dokku master:master
