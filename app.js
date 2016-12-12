
var glob = require("glob");
var express = require('express');
var shuffle = require('shuffle-array');
var morgan = require('morgan')
var fs = require('fs')
const path = require('path');
var app = express()
var config = require('config');

// STATIC CONFIG

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views')
app.set('view engine', 'pug');

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

  res.sendFile('search.html',options);
})


app.get('/img', function (req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  console.log("serve an image");
  glob(options.root+"*.jpg" ,{ dot:true} ,  function(err,files){
  	var shuf= shuffle(files)
  	var file = shuf[0];
  	console.log(shuf,"SERVING:"+path.basename(file));

  	res.sendFile('pug.jpg', options);
  });
   
})

app.get('/info| /info.json| info.html ', function(req,res) {
    res.send(info);
});


app.get('/api/health.json', function (req, res) {
  res.send('Healthy')
});

app.get('/tmp', function (req, res) {
  console.log(info);
  res.render('template',info);
})

app.get('/ansible', function (req, res) {
  console.log("entering ansible")
  res.render('ansible');
})


var port = config.get('app.port');
app.listen(port, function () {
  console.log('Example app listening on port! '+port)
})