/*global $:false */
(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/food/liked/' + window.username + '/', function( data ) {

      var template = $('.template').children().first().clone();

      $.each(data, function(index, food) {

        var thisTemplate = template.clone();

        thisTemplate.find('.name').text(food.name);
        thisTemplate.find('.price').text(food.price);
        /*jshint camelcase: false */
        thisTemplate.find('.num_likes .num').text(food.num_likes);
        thisTemplate.find('.food-photo img').attr('src', 'images/' + food.photo);

        thisTemplate.find('.food-photo, .info').wrap('<a href="food.html?id=' + food.id + '"></a>');

        $('.main-div').append(thisTemplate);

      });


    });
})();