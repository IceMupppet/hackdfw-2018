// Global Variables for Serial Port, Baud rate, Socket Port


// Hardcoded API command to get out of Factory Mode and into UserHack Mode
 
var ws = require("nodejs-websocket");

//var serialport = require('serialport'),
//    SerialPort = serialport.SerialPort, 
//      portName = "/dev/ttyS0";

//var Sphero = new SerialPort(portName, {
//   baudRate: 115200,
//   parser: serialport.parsers.readline("\r\n")
// });

//Sphero.on('open', sendSetUserHackMode);
 
var server = ws.createServer(function (socket_traffic) {

    console.log(" - Connection Started: ")


    // Parse packets from the socket connection send by virtualjoystick.js
    socket_traffic.on("text", function (str) {
        
        // Roll Command
	if(str.indexOf('joy') !== -1){
		var res = str.split(":");
		updatePacketToCommand_roll(res[1], res[2]);
		console.log("Roll Command : Heading [" + res[1] + "] Speed [" + res[2] + "]")
		console.log(displayPacket(api_buf));           
		//Sphero.write(api_buf);
	}

	// RGB Command
	else if(str.indexOf('rgb') !== -1){
		var res = str.split(":");
		console.log("RGB Command  : R[" + res[1] + "] G["+ res[2]+"] B["+ res[3] + "]")
	}

	// Invalid Command
	else{
		console.log("Invalid command: " + str)
	}
    })

   socket_traffic.on("error", function (err) {
         console.log(" - Connection Ended:")
    })

}).listen(8001)

function sendSetUserHackMode() {
   //Sphero.write(smu);
   Sphero.write(l0);
}

console.log("Socket server listening on port 8001")
