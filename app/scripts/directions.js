/*jshint camelcase: false */

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var latlng, restaurantAdd;

(function () {
    'use strict';
    var map;
    directionsDisplay = new google.maps.DirectionsRenderer(); 

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);

    function initialize() {
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(function (position) {                                                              
                latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var mapOptions = {
                    zoom: 14,  
                    center: latlng,
                };

                map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                directionsDisplay.setMap(map);
                
                $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

                    $('.sub-name').text("Get to " + data.name);
     
                    var source = $('#directions-template').html();
                    var template = Handlebars.compile(source);

                    $('.main-div').append(template(data));


                    restaurantAdd = new google.maps.LatLng(data.location_x, data.location_y)
                    var request = {
                        origin: latlng,
                        destination: restaurantAdd,
                        travelMode: google.maps.DirectionsTravelMode.WALKING,
                    };

                    directionsDisplay.setPanel(document.getElementById('directions-panel'));
                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                });
            });
       } else {
            alert("Geolocation not supported");
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
})();

function calcRoute() {
    //var start = document.getElementById('start').value;
    ///var end = document.getElementById('end').value;

    var mode = document.getElementsByName('transportMode');

    var selectedMode;
    for(var i=0; i < mode.length; i++){
        if(mode[i].checked){
            selectedMode = mode[i].value;
            break;
        }
    }
    
    var request = {
        origin: latlng,
        destination: restaurantAdd,
        travelMode: google.maps.TravelMode[selectedMode],
        provideRouteAlternatives:false
    };

    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}