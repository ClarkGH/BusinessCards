var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var adviceContainer = require('./lib/advice.js');
// var credentials = require('./credentials.js');
// var Test = require('./models/test.js');

var handlebars = require('express3-handlebars').create({ defaultLayout:'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

// var opts = {
//   server: {
//     socketOptions: { keepAlive: 1 }
//   }
// };

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Disable powered by response head
app.disable('x-powered-by');

// DB connection
// switch(app.get('env')){
//   case 'development':
//     mongoose.connect(credentials.mongo.development.connectionString, opts);
//     break;
//   case 'production':
//     mongoose.connect(credentials.mongo.development.connectionString, opts);
//     break;
//   default:
//     throw new Error('Unknown execution environment: ' + app.get('env'));
// }

//Seed data
// Test.find(function(err, test){
//   if(test.length) return;

//   new Test({
//     name: 'Bill',
//     description: 'I like pudding',
//     available: true,
//     inSeason: true,
//     age: 22,
//   }).save();
// });

//Set port
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(require('body-parser')());
app.use(require('express-session')());
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

// //delete later, an example
// app.get('/newsletter', function(req, res){
//   res.render('newsletter', { csrf: 'CSRF token goes here.'});
// });

// //delete later, an example
// app.post('/process', function(req, res){
//   if(req.xhr || req.accepts('json,html')==='json'){
//     res.send({ success: true });
//   } else {
//     res.redirect(303, '/');
//   }
// });

// //delete later, route for test

// app.get('/test', function(req, res){
//   Test.find({ available: true }, function(err, test){
//     var context = {
//       test: test.map(function(test){
//         return {
//           name: test.name,
//           description: test.description,
//           available: test.available,
//           inSeason: test.inSeason,
//           age: test.age,
//         }
//       })
//     };
//     res.render('test', context);
//   });
// });

//Run
app.listen(app.get('port'), function() {
  console.log( 'The express application is running on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});