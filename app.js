var express         = require('express');
var app             = express();
var adviceContainer = require('./lib/advice.js');
var main            = require('./handlers/main.js');
var bodyParser      = require('body-parser')
var mongoose        = require('mongoose')
var credentials     = require('./credentials.js')
var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main',
  helpers: {
    static: function(name) {
      return require('./lib/static.js').map(name);
    }
  }
});

//bodyParser() config to allow getting POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Port setting
app.set('port', process.env.PORT || 3000);

//Handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Databases
mongoose.connect(credentials.mongo.development.connectionString);


//Middleware
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test == '1';
  next();
});

//Routes
require('./routes.js')(app);

//Errors
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(req, res) {
  res.status(500);
  res.render('500');
});

//Listener
app.listen(app.get('port'), function() {
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
