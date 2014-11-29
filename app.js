var express = require('express');
var app = express();
var adviceContainer = [
  "You're beautiful.",
  "Stay Amazing.",
  "You're too great to give up.",
  "Little by little, improve.",
  "Effort is the key.",
  "You have the talent you need.",
  "Make others happy."
];

var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main' });


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  var randomAdvice = adviceContainer[Math.floor(Math.random() * adviceContainer.length)];
  res.render('about', { advice: randomAdvice });
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(req, res) {
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});