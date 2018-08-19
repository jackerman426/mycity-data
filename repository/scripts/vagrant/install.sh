# config
APP_DIR="/app/"
LOCKFILE="/app/.provisioned"

#!/bin/sh
if [ ! -f $LOCKFILE ];
then

    echo "===== Installing... First time run can take a while. ====="

    # Log output in install log
    exec 1> install.log
    #exec > install.log 1

    echo "===== Update sources ====="
    sudo apt-get -qq update


    echo "===== Locale settings ====="
    echo "# reset the locale for the machine to UTF" | sudo tee -a /etc/bash.bashrc
    echo "export LANGUAGE=en_US.UTF-8" | sudo tee -a /etc/bash.bashrc
    echo "export LANG=en_US.UTF-8" | sudo tee -a /etc/bash.bashrc
    echo "LC_ALL=en_US.UTF-8" | sudo tee -a /etc/bash.bashrc


    export LANGUAGE=en_US.UTF-8
    export LANG=en_US.UTF-8
    export LC_ALL=en_US.UTF-8

    echo "===== Generate the locale files for the system ====="
    sudo locale-gen en_US en_US.UTF-8
    sudo dpkg-reconfigure locales

    echo "===== Install first packages ====="
    sudo apt-get -qq -y install vim git-core curl python-software-properties

    echo "===== Install redis-server ====="
    sudo add-apt-repository ppa:chris-lea/redis-server
    sudo apt-get -qq update

    # -qq implies -y --force-yes
    sudo apt-get install -qq redis-server

    echo "===== Redis Configuration ====="
    sudo mkdir -p /etc/redis/conf.d

    sudo /etc/init.d/redis-server stop

    sudo sed -i -e 's/bind 127.0.0.1/# bind 127.0.0.1/g' /etc/redis/redis.conf
    sudo sed -i -e 's/protected-mode yes/protected-mode no/g' /etc/redis/redis.conf

    echo "===== Start Redis ====="
    sudo  /etc/init.d/redis-server start

    # fix bash encoding issue needs to be after postgres install
    echo "===== More locale stuff ====="
    echo export LC_CTYPE="en_US.UTF-8" | sudo tee -a /etc/environment
    export LC_CTYPE="en_US.UTF-8"


    ############
    # MongoDB (http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
    # Updated with: http://www.liquidweb.com/kb/how-to-install-mongodb-on-ubuntu-14-04/
    #############

    echo "===== Installing MongoDB ====="
    # Import the public key used by the package management system.
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

    # Create a list file for MongoDB.
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

    # Reload local package database.
    sudo apt-get -y -qq update

    # Install a specific release of MongoDB.
    sudo apt-get install -y mongodb-org

    # Pin a specific version of MongoDB.
    echo "mongodb-org hold" | sudo dpkg --set-selections
    echo "mongodb-org-server hold" | sudo dpkg --set-selections
    echo "mongodb-org-shell hold" | sudo dpkg --set-selections
    echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
    echo "mongodb-org-tools hold" | sudo dpkg --set-selections

    echo "===== Start MongoDB ====="
    sudo service mongod start

    # Allow remote access
    sudo sed -i -s 's/  bindIp: 127.0.0.1/  bindIp: 0.0.0.0/' /etc/mongod.conf
    sudo service mongod restart

    echo "===== Finishing up... ====="
    ##################################
    # create a file to detect we're already done next time
    sudo touch $LOCKFILE

    # Do some rights
    sudo chown vagrant:vagrant $APP_DIR

	#cleanup
    sudo apt-get -y clean



else
    echo "Config file already set, skipping setup."
fi
