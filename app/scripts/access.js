/*jshint camelcase: false */
(function () {
  'use strict';

  var username = getParameterByName('username');
  var vcode = getParameterByName('vcode');

  // localStorage.setItem('deals-unread', 2);
  // localStorage.setItem('friends-unread', 3);
  // localStorage.removeItem('firsttime');

  var num_to_load = 0;
  var num_loaded = 0;

  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
      var src = '';
      for (var key in this) {
        src = this[key];
      }
      $('<img/>').attr('src', 'images/' + src).load(function(){notifyImageLoad();});
    });
  }

  function notifyImageLoad() {
    num_loaded++;
    if (num_loaded === num_to_load) {
      console.log('done');
      setTimeout(function() {
        window.location = 'index.html';
      }, 3000);
    }
  }

  $.getJSON(window.apiUrl + '/login/?username=' + username + '&vcode=' + vcode, function(data) {
    if (data.success) {
      localStorage.setItem('username', username);
      $.getJSON( window.apiUrl + '/images/list/', function( data ) {
        num_to_load = data.length;
        preload(data);
      });
    } else {
      var source = $('#login-template').html();
      var template = Handlebars.compile(source);
      $('.main-div').html(template({}));
      return;
    }
  });

})();