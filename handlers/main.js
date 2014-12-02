var adviceContainer = require('../lib/advice.js');

exports.home = function(req, res) {
  res.render('home');
};

exports.about = function(req, res) {
  res.render('about', {
    advice: advice.getAdvice(),
    pageTestScript: '/qa/tests-about.js'
  });
};