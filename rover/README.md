# ROVER - 

A Robot platform with a 7.4V 2S Lipo battery wired to power a Sphero 5.5D Breakout board and a Raspberry Pi 3+ Embedded linux board running a debian based kernel. 

 * Node
 * Express
 * socket.io
 * VirtualJoystick.js
 * serialport
 * Sphero API
 * ngrok


# Installation
Installation is currently just running both node express servers.

## Using the serialport on a Raspberry Pi
This is tricky and requires us to build a specific version of nodejs, node 6.x.

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs 
    sudo apt-get install -y build-essential
    sudo npm install -g node-gyp
    sudo npm install -g node-pre-gyp
    sudo npm install serialport --unsafe-perm

    cd node_modules/serialport
    sudo node-gyp configure build



You will know it works when it says `gyp info ok` Test by running the test script in `/scripts`.

## Other Installation Steps
    
    sudo apt-get update upgrade
    sudo raspi-config

Change Password, Hostname, Wifi, enable SSH, Serial, Change Keyboard, Update Tool, Reboot

    sudo apt-get install-y cmake vim git zsh
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    sudo npm install -g express

# Usage
The control scheme is setup in two parts.  A WebSocket node.js express server that runs locally on the robot, and a joystick that can reside either locally or remotely.  The joystick can be served by anything, in our example we use the express node.js server to host the joystick locally.

## Server (Local Robot)
The WebSocket Node.js Express server listens for websocket connections locally on the robot.  This uses the serial port to communicate with the Sphero board on `/dev/ttyS0` using the sphero Command API.

 * Default Port: 8001

     node socket-serial-server.js

You will know this is working when it is run, the control system is turned on and the board is set from factory mode to user hack mode. Now that the local robot is hosting it's websocket server, go host the joystick client.

### SpheroSocket Scripting SDK
The websocket Sphero SDK wrapper being used is simply the command and parameters delimanated by a colon (:), ie    

      command:param1:param2:param3


| command   | param1        | param2          | param3  | param4  |
|---------  |-------------- |---------------- |-------- |-------- |
| roll      | speed[0-100]  | heading[0-360]  |         |         |


## Joystick (Hosted Locally and/or hosted on a webserver)
The virtualjoystick is a javascript layer that was built mobile first to deal with multiple touches but also works with a simple mouse.  To serve this locally we use the express node.js server.

 * Default Port: 10001

     node serve-index.js

You must edit `index.html` and replace the websocket information with either the external ip address of the robot or the internal depending on where this is hosted.

    var socket = new WebSocket("ws://127.0.0.1:8001");

You can now access the joystick interface by viewing the `http://$IPADDRESS:10001` in any browser or tablet.

 * TODO:  Build a locate script to send this when starting the server.  

# Serving to the internet
If we want to drive this robot over the internet, we can easilly use `ngrok`.  Here we are hosting the joystick on a public server for easy acces.  (DigitalOcean Ubuntu Droplet) 

Start the server locally, then after everything is running, issue: 

     ngrok 8001

This will spit out a value forwared tunnel address for your robot.  Simply plug that in as the `socket` information located in `index.html` within the joystick folder.  start the server, or drop it into `/var/www/` if you are hosting that with `Apache2`. 

      node server-index.js

Visit the joystick with any browser or smartphone.
 
