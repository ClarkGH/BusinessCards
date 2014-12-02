

module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/about', function(req, res) {
    res.render('about', {
      advice: adviceContainer.getAdvice(),
      pageTestScript: '/qa/tests-about.js'
    } );
  });

  app.use(function(req, res) {
    res.status(404);
    res.render('404');
  });

  app.use(function(req, res) {
    res.status(500);
    res.render('500');
  });

};