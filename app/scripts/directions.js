/*jshint camelcase: false */

(function () {
    'use strict';
    var map, restaurantAdd, origin, input, autocomplete;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

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

            $('.sub-name').text('Get to ' + data.restaurant.name);

            restaurantAdd = new google.maps.LatLng(data.restaurant.x, data.restaurant.y);
            origin = new google.maps.LatLng(data.user.x, data.user.y);
            var request = {
                origin: origin,
                destination: restaurantAdd,
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
            };

            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            directionsService.route(request, function (response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        });

        input = document.getElementById('start');
        var autocompleteOptions = {
            componentRestrictions: {country: 'sg'}
        };
        autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
        
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            calcRoute();
        });

        $('.transportMode').click(function(){
            calcRoute();
        });

        function calcRoute(){
            var start = $('#start').val();
            if(start){
                origin = start;
            }

            var mode = $('.transportMode:checked').val();

            var request = {
                origin: origin,
                destination: restaurantAdd,
                travelMode: google.maps.TravelMode[mode],
            };

            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            directionsService.route(request, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
})();