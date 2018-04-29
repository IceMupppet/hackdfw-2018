var express = require('express')
 , async = require('async')
 , http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 9000);

app.use(express.static(__dirname + '/public/images'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sms/api/v1',function(request,response,next){

   var local_source       =request.body.source;
   var local_data         =request.body.data;

   console.log('New data from ' + local_source + ' containing ' + local_data);
   response.writeHead(200, {'Content-Type': 'text/html'});
   response.end();


} );


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
