const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

DB = {};

app.get('/:url', function (req, res) {
  console.log("in");
  var longUrl = getUrl(req.params.url);
  res.json({longUrl:longUrl});
})

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
  return "Not Found";
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
