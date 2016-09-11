var express = require('express');
var assert = require('assert')
var request = require('request');
var app = express();
var API_KEY = process.env.BING_API_KEY;

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:query', function(req, res) {

  var options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + req.params.query + '&mkt=en-us',
    headers: {
      'Ocp-Apim-Subscription-Key': API_KEY
    }
  };

  request(options, function(err, response, body) {
    assert.equal(err, null);
    if (!err && response.statusCode == 200) {
      var results = JSON.parse(body);
      var arr = [];

      for (var i = 0; i < results.value.length; i++) {
        arr.push({
          "url": results.value[i].contentUrl,
          "snippet": results.value[i].name,
          "thumbmail": results.value[i].thumbnailUrl,
          "context": results.value[i].hostPageUrl
        })
      }

      res.send(arr);
    }
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
