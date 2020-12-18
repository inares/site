# INARES

This is the repository for the INARES main site.


## Installation
You need to use Ubuntu Xenial:
```
docker run --name inares-site -it ubuntu:xenial
```

Then, run this:
```
apt update && \
apt install -y --no-install-recommends git imagemagick graphicsmagick ruby-full curl g++ make libpng-dev automake pkg-config openssh-client python-dev && \
curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
apt-get install -y --no-install-recommends nodejs && \
git clone https://github.com/inares/site.git && \
cd site && \
rm yarn.lock -f && \
npm install && \
gem install bundler && \
bundle install --jobs=3 --retry=3 && \
bundle package

npm run build
```

To deploy to Netlify:
```
npm install netlify-cli -g
netlify login
netlify deploy --dir=_site --prod 
```
