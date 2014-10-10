/*global $:false */
(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/restaurants/following/' + window.username + '/', function( data ) {

      var template = $('.template').children().first().clone();

      $.each(data, function(index, restaurant) {

        var thisTemplate = template.clone();

        thisTemplate.find('.name').text(restaurant.name);
        /*jshint camelcase: false */
        thisTemplate.find('.price-range .low').text(restaurant.price_low);
        thisTemplate.find('.price-range .high').text(restaurant.price_high);
        thisTemplate.find('.address').text(restaurant.location_name);
        thisTemplate.find('.photo img').attr('src', '/images/' + restaurant.photo);

        $('.main-div').append(thisTemplate);

      });


    });
})();