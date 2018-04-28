# The  WebSocket Server

This will host the socket server that listens on port `8001` locally on the robot.

# Accessing the socket server from a local browser

Start the virtualjoystick server that will communicate with the socket server.

# Accessing the socket server from the internet

you must first forward port 8001 using ngrok so we can fill this info into online server.

       ngrok 8001

Edit the index.html on webserver 


       ws = "ws://n5ab3ds3.ngrok.com"

And run the joystick, if everything works you will see debug information.


