var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery/dist/jquery')

var AppView = Backbone.View.extend({
  render: function(){
    $('main').append('<h1>Utilizing Browserify.</h1>');
  }
});

var appView = new AppView();
appView.render();