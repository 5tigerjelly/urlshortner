const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var storage = require('node-persist');
storage.initSync();

app.use(express.static('public'));
app.use(bodyParser.urlencoded());

KEYS = new Set(storage.keys()); //load keys only once
NOTFOUND = "Not Found!!!";
var PORT = process.env.PORT || 3000;

// get url
app.get('/:url', function (req, res) {
  console.log('short url is '+ req.params.url);
  getUrl(req.params.url).then(function(longUrl){
    if(longUrl == NOTFOUND){
      res.sendStatus(404);
    }else{
      res.redirect(301, longUrl);
    }
  });
});

// set url
app.put('/', function (req, res) {
  console.log('full url is '+ req.body.url);
  setUrl(req.body.url).then(function(shortUrl){
    console.log("IN");
    console.log('shrunk url is ' + shortUrl);
    res.json({shortUrl:shortUrl});
  });

});

function setUrl(fullUrl){
  return new Promise((resolve, reject) => {
    storage.get(fullUrl).then(function(value) {
      console.log(value);
      if(typeof value != 'undefined'){
        resolve(value);
      }else{
        value = makeid();
        while(value in KEYS){
          value = makeid();
        }
        storage.set(value, fullUrl);
        resolve(value);
      }
    });
  });
}

function getUrl(shortUrl){
  return new Promise((resolve, reject) => {
    storage.get(shortUrl).then(function(value) {
      console.log(value);
      if(typeof value === 'undefined'){
        reject(NOTFOUND);
      }else{
        resolve(value);
      }
    });
  });
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

app.listen(PORT, function () {
  console.log('Server Started')
})
