DB = {};

function setUrl(fullUrl){
  var randomUrl = makeid();
  while(DB[randomUrl]){
    randomUrl = makeid();
  }
  DB[randomUrl] = fullUrl;
  return randomUrl;
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
