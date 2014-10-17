/*jshint camelcase: false */

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var origin, restaurantAdd;

(function () {
    'use strict';
    var map, alert;

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);

    function initialize() {                                                        
        origin = new google.maps.LatLng(1.296568, 103.852118);

        var mapOptions = {
            zoom: 14,  
            center: origin,
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);
        
        $.getJSON( window.apiUrl + '/directions/' + restaurant_id + '/' + window.username + '/', function( data ) {

            $('.sub-name').text('Get to ' + data.restaurant['name']);

            restaurantAdd = new google.maps.LatLng(data.restaurant['x'], data.restaurant['y']);
            origin = new google.maps.LatLng(data.user['x'], data.user['y']);
            var request = {
                origin: origin,
                destination: restaurantAdd,
                travelMode: google.maps.DirectionsTravelMode.WALKING,
            };

            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
})();

/* exported calcRoute */
function calcRoute() {
    'use strict';
    var start = document.getElementById('start').value;
    if(start){
        origin = start;
    }

    var mode = document.getElementsByName('transportMode');
    var selectedMode='DRIVING';
    for(var i=0; i < mode.length; i++){
        if(mode[i].checked){
            selectedMode = mode[i].value;
            break;
        }
    }

    var request = {
        origin: origin,
        destination: restaurantAdd,
        travelMode: google.maps.TravelMode[selectedMode],
        provideRouteAlternatives:false
    };

    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}