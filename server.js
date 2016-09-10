var express = require('express');
var request = require('request');
var app = express();
var API_KEY = process.env.BING_API_KEY;

app.set('port', (process.env.PORT || 5000));

var options = {
  url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=sailing+dinghies&mkt=en-us',
  headers: {
    'Ocp-Apim-Subscription-Key': API_KEY
  }
};

app.get('/', function(req, res) {

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      res.send(info);
    }
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
