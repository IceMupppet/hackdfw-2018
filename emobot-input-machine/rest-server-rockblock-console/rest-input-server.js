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

// To host externally: run ./ngrok http 9000 
// Replace the webhook on the Twillio Dashboard with the ngrok tunnel information
// Example:  http://dc3d7f83.ngrok.io/sms/api/v1

app.post('/sms/api/v1',function(req,response,next){
   
   // Grab the variables from the request.body.Body (Found in Twillio API Documents)
   var local_body = req.body.Body;

   console.log('New data:  ' + local_body);

   // We have new data from the POST sent via Twillio as the Webhook 
   var options = { method: 'POST',
      url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone',
      qs: {               version: '2017-09-21' },
      headers: {  'postman-token': '63402e28-abd7-9eee-9e78-b754e1d0b790',
                  'cache-control': 'no-cache',  'Content-Type': 'text/html', 
                    authorization: 'Basic MTI0MjRmYTUtNjI1Ny00M2ViLTk2ZjEtZThkMzBiMjUxMWQ4OmlzYXZ2TnR6eTRqNQ==' },
                             body: local_body 
    };

    // Local variables for Emotion and percentage
    var main_emotion = "";
    var emotion_percentage = "";

    // Send the request to Watson 
    request(options, function (error, response, body) {
  	    if (error) throw new Error(error);
        var objects = JSON.parse(body);
        //console.log("OBJ length : " + obj);
        /**
        objects.forEach(function (obj) {
           console.log(obj.items);
        });
        **/


        // If the response from Watson is not NULL, parse this data for emotion.
        if(objects.document_tone.tones != null){
            // These values are parsed from Watson's Response JSON {document_tone.tones.tone_id}
      	    console.log('Main Emotion: ' + objects.document_tone.tones[0].tone_id + ' @ ' + objects.document_tone.tones[0].score);
        }


     });

    // Send a response back to the client
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<Response><Sms>Thanks for sending me a text message.</Sms></Response>');
    response.end();
});

http.createServer(app).listen(app.get('port'), function(){
 console.log('Server listening on port ' + app.get('port'));
});
