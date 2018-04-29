var request = require("request");

var options = { method: 'POST',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone',
      qs: { version: '2017-09-21' },
        headers: 
             { 'postman-token': '63402e28-abd7-9eee-9e78-b754e1d0b790',
                    'cache-control': 'no-cache',  'Content-Type': 'text/html', 
                         authorization: 'Basic MTI0MjRmYTUtNjI1Ny00M2ViLTk2ZjEtZThkMzBiMjUxMWQ4OmlzYXZ2TnR6eTRqNQ==' },
          body: 'Just had a long and very good talk with President Moon of South Korea. Things are going very well, time and location of meeting with North Korea is being set. Also spoke to Prime Minister Abe of Japan to inform him of the ongoing negotiations.' };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

      console.log(body);
});
