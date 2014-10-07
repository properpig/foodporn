/*global $:false */
(function () {
    'use strict';

    var username = 'john';
    $.getJSON( 'http://128.199.140.174:8000/food/likedfoodlist/' + username + '/', function( data ) {

      var template = $('.template').children().first().clone();

      $.each(data, function(index, food) {

        template.find('.name').text(food.name);
        template.find('.price').text(food.price);
        /*jshint camelcase: false */
        template.find('.num_likes .num').text(food.num_likes);
        template.find('.food-photo img').attr('src', '/images/' + food.photo);

        $('.main-div').append(template.clone());

      });


    });
})();