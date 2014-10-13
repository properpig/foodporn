/*global $:false */
(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/restaurants/recommended/' + window.username + '/', function( data ) {

      console.log(data);

      var template = $('.template').children().first().clone();

      $.each(data, function(index, restaurant) {

        var thisTemplate = template.clone();

        thisTemplate.find('.name').text(restaurant.name);
        /*jshint camelcase: false */
        thisTemplate.find('.price-range .low').text(restaurant.price_low);
        thisTemplate.find('.price-range .high').text(restaurant.price_high);
        thisTemplate.find('.address').text(restaurant.location_name);
        thisTemplate.find('.photo img').attr('src', 'images/' + restaurant.photo);

        if (restaurant.is_following) {
          thisTemplate.find('.follow-button').addClass('following');
        }

        var people_following = '';

        // get the people following this restaurant
        $.each(restaurant.followed_by, function(index, user) {
          people_following += '<img src="images/' + user.photo + '" />';
        });

        var more_count = restaurant.following_count - restaurant.followed_by.length;
        if (more_count > 0) {
          thisTemplate.find('.followed-by .num').text(more_count);
        } else {
          thisTemplate.find('.followed-by .more-following').hide();
        }

        thisTemplate.find('.followed-by').prepend(people_following);

        thisTemplate.find('.photo, .info').wrap('<a href="restaurant.html?id=' + restaurant.id + '"></a>');

        $('.main-div').append(thisTemplate);

      });


    });
})();