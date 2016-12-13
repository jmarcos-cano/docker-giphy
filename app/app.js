
var express = require('express');
var morgan = require('morgan')
var fs = require('fs')
const path = require('path');
var app = express()
var config = require('config');

// STATIC CONFIG

app.use(express.static(__dirname + '/public'));



// LOGGING
var logdir = config.get('app.logdir');
var info = config.get('info');
var accessLogStream = fs.createWriteStream(path.join(logdir, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

// ROUTES
app.get('/', function (req, res) {
  res.render('template',info);
})

app.get('/search | search.html', function(req,res){
  res.redirect("/search.json");
})
app.get('/search.json', function (req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.set({
  	 'ETag': 'devops_12345',
  	 'myHeaderTag': 'have_fun'
  });

  res.sendFile('index.html',options);
})


app.get('/info| /info.json| info.html ', function(req,res) {
    res.send(info);
});



var port = config.get('app.port');
app.listen(port, function () {
  console.log('Example app listening on port! '+port)
})