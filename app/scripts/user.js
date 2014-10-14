/*global $:false */
/*jshint camelcase: false */
/*global Handlebars:false */
/*global google:false */
/*jshint unused:false */

(function () {
  'use strict';

  var map, marker;

  var query  = window.location.search.substring(1);
  var user_id = query.substring(query.indexOf('=') + 1, query.length);

  // map stuff
  function initialize() {
    var mapOptions = {
      center: {lat: 1.296568, lng: 103.852118},
      zoom: 14,
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: false,
      streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // after map is done, load user info
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

      $.each(data.reviews, function(index, review){

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(review.restaurant_x, review.restaurant_y),
            map: map,
            title: 'Hello World!'
        });

        marker.setMap(map);

      });

    });

  }

  google.maps.event.addDomListener(window, 'load', initialize);

})();
