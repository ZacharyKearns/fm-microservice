var express = require('express');
var app = express();
var API_KEY = process.env.GOOGLE_API_KEY;

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.redirect('https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=017576662512468239146:omuauf_lfve&q=lectures');
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
