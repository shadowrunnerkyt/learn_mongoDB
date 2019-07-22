mv /tmp/node.service /etc/systemd/system/
appdir="/opt/catalog"
echo "Creating the application directory"
if ! [ -d $appdir ]; then
    mkdir -p $appdir
fi
# echo "Installing the EPEL repository"
# sudo apt-get -y install epel-release
echo "Install Node.js"
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Deploying the application files"
sudo cp -r /vagrant/appfiles/* $appdir/
echo "Availing the prerequisites"
cd $appdir
sudo npm install express body-parser mongojs
# install for testing so we don't have to keep reloading node when there are changes
# sudo npm install -g nodemon
echo "Making the catalog.js file executable"
chmod +x catalog.js
echo "Starting the application"
systemctl enable node
systemctl restart node