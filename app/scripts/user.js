/*global $:false */
/*jshint camelcase: false */
(function () {
  'use strict';

  var query  = window.location.search.substring(1);
  var user_id = query.substring(query.indexOf('=') + 1, query.length);

  // user info
  Handlebars.registerHelper('pluralise', function(num, type) {
    var string = type;
    if (num !== 1) {
      string += 's';
    }
    return num + ' ' + string;
  });

  $.getJSON( window.apiUrl + '/user/' + user_id + '/' + window.username + '/', function( data ) {

    var source = $('#user-template').html();
    var template = Handlebars.compile(source);

    $('.main-div').append(template(data));

    $('.sub-name').text(data.name);

  });

  // map stuff
  function initialize() {
    var mapOptions = {
      center: {lat: 1.296568, lng: 103.852118},
      zoom: 14,
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: false
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

  }

  google.maps.event.addDomListener(window, 'load', initialize);

})();
