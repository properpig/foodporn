/*jshint unused:false */

(function () {
  'use strict';

  var map, marker;

  var query  = window.location.search.substring(1);
  var user_id = query.substring(query.indexOf('=') + 1, query.length);

  var source = $('#user-template').html();
  var template = Handlebars.compile(source);

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

    getDetails();

  }

  function getDetails() {

    $.getJSON( window.apiUrl + '/user/' + user_id + '/' + window.username + '/', function( data ) {

      $('#dynamic-info').html(template(data));

      $('.sub-name').text(data.name);

      $.each(data.reviews, function(index, review){

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(review.restaurant_x, review.restaurant_y),
            map: map,
            title: 'Hello World!'
        });

        marker.setMap(map);

      });

    }).done(function() {

      $('.follow-button').click(function() {

        var user_id = $(this).data('id');
        var follow_button = $(this);

        $.getJSON (window.apiUrl + '/user/follow/' + user_id + '/' + window.username + '/', function(data) {

          if (data.status === 'success') {
            follow_button.toggleClass('following');
            getDetails();
          }
        });

      });

    });

  }

  google.maps.event.addDomListener(window, 'load', initialize);

})();
