const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//# connect mongoDB
const mongoose = require('mongoose');
const uristring = 'mongodb://localhost:27017/angular6node';
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./server/api.js'));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



const server = app.listen(8081, () => {

  const port = server.address().port;
  console.log(`API running on localhost :${port}`)

});
