"use strict";

var Cylon = require("cylon");

// ensure you install the API plugin first:
Cylon.api("http", {
  host: '10.9.7.114',
  port: '2020',

// $ npm install cylon-api-http
//Cylon.api();
//Cylon.api("http", {

//  ssl: ""
});

Cylon.robot({
  name: "Frankie",

  sayRelax: function() {
    console.log("web page clicked");
    return this.name + " says relax" ;
  },

  work: function(my) {
    every((5).seconds(), function() {
      console.log(my.sayRelax());
    });
  },

  commands: function() {
    return {
      say_rela: this.sayRelax
    };
  }
});

Cylon.start();
