var express = require('express');
var app = express();
var adviceContainer = require('./lib/advice.js');

var handlebars = require('express3-handlebars').create({ defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Disable powered by response head
app.disable('x-powered-by');

//Set port
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(require('body-parser')());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test == '1';
  next();
});

//Routes
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', {
    advice: adviceContainer.getAdvice(),
    pageTestScript: '/qa/tests-about.js'
  } );
});

app.get('/headers', function(req,res){
  res.set('Content-Type','text/plain');
  var s ='';
  for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n'; res.send(s);
});


app.get('/author/clark', function(req, res){
  res.render('author/clark');
});

app.get('/author/contact-clark', function(req, res){
  res.render('author/contact-clark');
});

app.get('/newsletter', function(req, res){
  res.render('newsletter', { csrf: 'CSRF token goes here.'});
});

app.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/');
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(req, res) {
  res.status(500);
  res.render('500');
});



//Run
app.listen(app.get('port'), function() {
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});