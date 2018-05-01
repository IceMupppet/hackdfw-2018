var express = require('express')
 , async = require('async')
 , request = require("request")
 , http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 9000);

app.use(express.static(__dirname + '/public/images'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sms/api/v1',function(req,response,next){

   var local_body         =req.body.Body;
   console.log('New data  ' + local_body);
   response.writeHead(200, {'Content-Type': 'text/html'});
   response.end();

   var options = { method: 'POST',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone',
      qs: { version: '2017-09-21' },
      headers: {  'postman-token': '63402e28-abd7-9eee-9e78-b754e1d0b790',
                  'cache-control': 'no-cache',  'Content-Type': 'text/html', 
                    authorization: 'Basic MTI0MjRmYTUtNjI1Ny00M2ViLTk2ZjEtZThkMzBiMjUxMWQ4OmlzYXZ2TnR6eTRqNQ==' },
      body: local_body };

	    request(options, function (error, response, body) {
	    if (error) throw new Error(error);
      var obj = JSON.parse(body);

      if(0==0){
          var relayoff = 0;
      
    	    console.log('Main Emotion: ' + obj.document_tone.tones[0].tone_id + ' @ ' + obj.document_tone.tones[0].score);

          if(obj.document_tone.tones[0].tone_id.toString() == 'sadness'){
             var options2 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/sadness'};
          }
          else if(obj.document_tone.tones[0].tone_id.toString() == 'joy'){
             var options2 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/joy'};
          }
          else if(obj.document_tone.tones[0].tone_id.toString() == 'anger'){
             var options2 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/pissed'};
             relayoff = 1;
          }
          else if(obj.document_tone.tones[0].tone_id.toString() == 'fear'){
             var options2 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/fear'};
          }
          else{
            var options2 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/anger'};
          }

          request(options2, function (error, response, body) {

          if(relayoff == 1) {
            setTimeout(function() {
              var options3 = { method: 'GET', url: 'http://10.9.7.114:2020/api/robots/emobot/commands/relayoff'};
              request(options3, function (error, response, body) {
              if (error) throw new Error(error);
                //  console.log(obj.document_tone.tones[0].tone_id.toString());
              });
            }, 5000);
          }
          if (error) throw new Error(error);
            //  console.log(obj.document_tone.tones[0].tone_id.toString());
          });
     }
	});
} );



http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
