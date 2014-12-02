var express = require('express');
var app = express();
var adviceContainer = require('./lib/advice.js');

var handlebars = require('express3-handlebars')
  .create({ defaultLayout:'main' });


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' && req.query.test == '1';
  next();
});

//Routes
require('./routes.js')(app);


app.listen(app.get('port'), function() {
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
