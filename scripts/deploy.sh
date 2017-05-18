#!/bin/bash

# We need:
#   - ssh_server
#   - ssh_port
#   - ssh_user

mydate=$(date +%Y-%m-%d_%H-%M-%S)

echo -e "\n*** Statistics ***"
du --max-depth=1 -h _site

echo "$mydate" > _site/version.txt

echo -e "\n\n*** Uploading _site ***"
chmod 600 ~/.ssh/travis_key
# ls -alh ~/.ssh/travis_key
ssh-keyscan -p $ssh_port -H $ssh_server >> ~/.ssh/known_hosts
time rsync --stats --verbose --itemize-changes --human-readable --compress --compress-level=7 --recursive --times --perms --skip-compress=jpg/jpeg/png/gif/woff --delete-after --no-motd -e "ssh -o StrictHostKeyChecking=no -i \"$HOME/.ssh/travis_key\" -p $ssh_port" _site/ $ssh_user@$ssh_server:/var/www/site/
