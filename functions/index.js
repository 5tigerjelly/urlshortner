const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// KEYS = new Set(storage.keys()); //load keys only once
NOTFOUND = "Not Found!!!";
RANDOMKEYLEN = 5;

// get url
exports.getUrl = functions.https.onRequest((req, res) => {
  getUrl(req.params.url).then(function(longUrl) {
    if (longUrl == NOTFOUND) {
      res.sendStatus(404);
    } else {
      res.redirect(301, longUrl);
    }
  });
});

// set url
exports.setUrl = functions.https.onRequest((req, res) => {
  var newUrlKey = admin
    .database()
    .ref("url")
    .child("test")
    .push().key;

  admin
    .database()
    .ref("url/" + newUrlKey)
    .set({
      longUrl: "longUrl",
      shortUrl: newUrlKey
    });
  //   setUrl(req.body.url).then(function(shortUrl) {
  //     res.json({
  //       shortUrl: shortUrl
  //     });
  //   });
  res.send(newUrlKey);
});

// function setUrl(fullUrl) {
//   return new Promise((resolve, reject) => {
//     storage.get(fullUrl).then(function(value) {
//       if (typeof value != "undefined") {
//         resolve(value);
//       } else {
//         value = makeid();
//         while (value in KEYS) {
//           value = makeid();
//         }
//         storage.set(value, fullUrl);
//         storage.set(fullUrl, value);
//         resolve(value);
//       }
//     });
//   });
// }

// function getUrl(shortUrl) {
//   return new Promise((resolve, reject) => {
//     storage.get(shortUrl).then(function(value) {
//       if (typeof value === "undefined") {
//         reject(NOTFOUND);
//       } else {
//         resolve(value);
//       }
//     });
//   });
// }

// function makeid() {
//   var text = "";
//   var possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < RANDOMKEYLEN; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }
