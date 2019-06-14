# urlshortner

Life is too short for long urls. Shorten them.

## Working Beta

The current beta is running on [heroku](https://safe-taiga-63621.herokuapp.com/)<br/>
https://safe-taiga-63621.herokuapp.com

## Running Program on Local Machine

To install dependencies

```js
npm install
```

To start running locally

```js
npm start
```

## Deployment

###Firebase

```
firebase deploy --only functions:setUrl
```

## Technical Detail

### Node.js

The main component was built on `node.js`.

### Dependencies

`express` handles all routing to the server.<br />
`node-persist` allows data to be stored to memory for later access. This replaces an actual database.<br />
`body-parser` parses the body of the request made from the front end.

## TODO List

### able to shorten url

- [x] check for cache
- [x] check if valid url
- [ ]     able to set end time
- [ ]     able to set max number of clicks

### able to customize url

- [ ]     check if customize already taken

### able to analyze clicks

- [ ]     check number of clicks
- [ ]     check country click
- [ ]     check when click

### able to login

- [ ] able to make account
- [ ]     no dup id
- [ ]     password

### Useful Links

https://stackoverflow.com/questions/14754619/jquery-ajax-success-callback-function-definition
