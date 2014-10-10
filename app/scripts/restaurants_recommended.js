/*global $:false */
(function () {
    'use strict';

    var username = 'john';
    $.getJSON( window.apiUrl + '/restaurants/recommended/' + username + '/', function( data ) {

      console.log(data);

      var template = $('.template').children().first().clone();

      $.each(data, function(index, restaurant) {

        var thisTemplate = template.clone();

        thisTemplate.find('.name').text(restaurant.name);
        /*jshint camelcase: false */
        thisTemplate.find('.price-range .low').text(restaurant.price_low);
        thisTemplate.find('.price-range .high').text(restaurant.price_high);
        thisTemplate.find('.address').text(restaurant.location_name);
        thisTemplate.find('.photo img').attr('src', '/images/' + restaurant.photo);

        if (restaurant.is_following) {
          thisTemplate.find('.follow-button').addClass('following');
        }

        $('.main-div').append(thisTemplate);

      });


    });
})();