var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(200)
})

app.post('/uploads', upload.single('user-upload'), function(req, res, next) {
  res.send(req.file.size)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
