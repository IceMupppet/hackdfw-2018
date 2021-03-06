var Cylon = require('cylon');


Cylon.api("http", {
  host: '10.9.7.114',
  port: '2020',
  ssl: '',

});


Cylon.robot({

  name: "emobot",
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'd792d0a0a866', module: 'cylon-ble'}
  },

  devices: {
    bb8: { driver: 'bb8', module: 'cylon-sphero-ble'}
  },

  joyfunc: function() {
   console.log("joy");
      this.bb8.color(0x00FF00);
      this.bb8.spin("left", 80);
    after(1000, function() {
      this.bb8.spin("right", 80);
})
    },

  fearfunc: function() {
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
      ledoff: this.offfunc
    };
  }

}).start();

