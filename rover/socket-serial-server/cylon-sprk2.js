var SerialPort = require('serialport');// include the library

var myPort = SerialPort('/dev/ttyACM0', {
   baudRate: 9600
 });

myPort.on('open', sendSetUserHackMode);


function sendSetUserHackMode() {
   myPort.write('REL1.ON\r\n');
   console.log("relay");
}

function relayofffunc() {
   myPort.write('REL1.OFF\r\n');
   console.log("relay");
}

var Cylon = require('cylon');


Cylon.api("http", {
  host: '10.9.7.114',
  port: '2020',
  ssl: '',

});
Cylon.robot({

  name: "emobot",
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'd792d0a0a866', module: 'cylon-ble'},
//    bluetooth2: { adaptor: 'central', uuid: 'e8ea138570ef', module: 'cylon-ble'}
  },

  devices: {
    bb8: { driver: 'bb8', module: 'cylon-sphero-ble', connection: 'bluetooth'},
//    bb82: { driver: 'bb8', module: 'cylon-sphero-ble', connection: 'bluetooth2'}
  },

  joyfunc: function() {
   console.log("joy");
      this.bb8.color(0x00FF00);
      this.bb8.spin("left", 80);
      sendSetUserHackMode();
    },

  fearfunc: function(p) {
   console.log("fear");
      this.bb8.color(0xFF7F00);
    },

  sadnessfunc: function() {
   console.log("sadness");
      this.bb8.color(0x7f007F);
    },

  angerfunc: function() {
   console.log("anger");
      this.bb8.color(0xFF0000);
    },

  offfunc: function() {
   console.log("off");
      this.bb8.color(0x000000);
    },

  work: function(my) {
    my.bb8.color(0x010101);

//    after(500, function() {
//      my.bb8.color(0xFF0000);
//    });

//    after(1000, function() {
//      my.bb8.roll(60, 0);
//    });

//    after(2000, function() {
//      my.bb8.roll(60, 180);
//    });

//    after(3000, function() {
//      my.bb8.stop();
//    });
  },

  commands: function() {
    return {
      joy: this.joyfunc,
      fear: this.fearfunc,
      sadness: this.sadnessfunc,
      anger: this.angerfunc,
      ledoff: this.offfunc,
      relayoff: relayofffunc
    };
  }

}).start();

