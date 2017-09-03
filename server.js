const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

DB = {};
NOTFOUND = "Not Found!!!";

// get url
app.get('/:url', function (req, res) {
  console.log('short url is '+ req.params.url);
  var longUrl = getUrl(req.params.url);
  if(longUrl == NOTFOUND){
    res.sendStatus(404);
  }else{
    res.redirect(301, longUrl);
  }
});

// set url
app.put('/', function (req, res) {
  console.log(req.body);
  console.log('full url is '+ req.body.url);
  var shortUrl = setUrl(req.body.url);
  console.log('shrunk url is ' + shortUrl);
  res.json({shortUrl:shortUrl});
});

function setUrl(fullUrl){
  if(DB[fullUrl]){
    return DB[fullUrl];
  }else{
    var randomUrl = makeid();
    while(DB[randomUrl]){
      randomUrl = makeid();
    }
    DB[randomUrl] = fullUrl;
    return randomUrl;
  }
}

function getUrl(shortUrl){
  if(DB[shortUrl]){
    return DB[shortUrl];
  }
  return NOTFOUND;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

var short = setUrl("longurl.com");
console.log(short);
console.log(getUrl(short));
console.log(DB);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
