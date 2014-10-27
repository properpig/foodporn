var infoSource = $('#info-template').html();
var infoTemplate = Handlebars.compile(infoSource);

/*exported showMap */
function showMap(listings) {
  'use strict';

  $('.main-div').html('<div class="map-container"><div id="map-canvas"></div><div class="info-pane"></div></div>');

  // populate the map
  var mapOptions = {
    center: {lat: parseFloat(listings[0].location.x), lng: parseFloat(listings[0].location.y)},
    zoom: 14,
    mapTypeControl: false,
    scaleControl: false,
    zoomControl: false,
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var markers = [];

  var bounds = new google.maps.LatLngBounds();

  // put the user down
  var marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(user.x, user.y),
      map: map,
  });

  marker1.infowindow = new google.maps.InfoWindow();
  var content = 'You are here';
  marker1.infowindow.setContent(content);

  google.maps.event.addListener(marker1, 'click', function() {

    marker1.infowindow.open(map, marker1);
    marker1.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

  });

  marker1.setMap(map);

  $.each(listings, function(index, restaurant){

    var latlon = new google.maps.LatLng(restaurant.location.x, restaurant.location.y);
    var image = {
      url: 'images/icons/marker.png',
      scaledSize: new google.maps.Size(35, 35),
    };
    var marker = new google.maps.Marker({
        position: latlon,
        map: map,
        icon: image
    });

    marker.infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {

      map.panTo(latlon);

      // close all the other info windows first
      $.each(markers, function(index, marker_obj) {
        // marker_obj.infowindow.close();
        marker_obj.setIcon(image);
      });

      marker1.infowindow.close();

      // var content = restaurant.name;
      // marker.infowindow.setContent(content);
      var image1 = {
        url: 'images/icons/marker-clicked.png',
        scaledSize: new google.maps.Size(38, 38),
      };

      marker.setIcon(image1);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

      // populate the content
      $('.info-pane').html(infoTemplate(restaurant)).promise().done(function() {

        // hide arrow for first and last
        if (index === 0) {
          $('.info-pane .left-arrow').css('opacity', 0);
        } else {
          $('.info-pane .left-arrow').click(function() {
            // trigger click of next marker
            new google.maps.event.trigger(markers[index-1], 'click');
          });
        }

        if (index === listings.length - 1) {
          $('.info-pane .right-arrow').css('opacity', 0);
        } else {
          // set event listeners for the arrows
          $('.info-pane .right-arrow').click(function() {
            // trigger click of next marker
            new google.maps.event.trigger(markers[index+1], 'click');
          });
        }
      });

    });

    marker.setMap(map);

    bounds.extend(latlon);
    markers.push(marker);
  });

  map.fitBounds(bounds);
  var listener = google.maps.event.addListener(map, 'idle', function() {
    if (map.getZoom() > 14) {map.setZoom(14);}
    google.maps.event.removeListener(listener);
  });

  // click the first
  new google.maps.event.trigger(markers[0], 'click' );

}

var user;

(function () {
  'use strict';

  // get the user's location
  function getLocation() {
    $.getJSON( window.apiUrl + '/directions/2/' + window.username + '/', function( data ) {
      console.log(data);
      user = data.user;
    });
  }

  getLocation();
})();