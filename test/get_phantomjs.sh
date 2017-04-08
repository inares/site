#!/bin/sh

echo "Downloading PhantomJS ..."
curl -o- -sSL https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar --strip-components=2 -xjf - phantomjs-2.1.1-linux-x86_64/bin/phantomjs
sudo ln -sf `pwd`/phantomjs /usr/local/bin/phantomjs
ll `pwd`/phantomjs