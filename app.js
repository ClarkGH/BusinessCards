var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.type('text/plain');
  res.send('Main Page');
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Page');
});

app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(req, res){
  res.type('text/plain');
  res.status(500);
  res.send('500 - Internal Error');
});

app.listen(app.get('port'), function(){
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});