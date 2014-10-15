/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var food_id = query.substring(query.indexOf('=') + 1, query.length);

    $.getJSON( window.apiUrl + '/food/' + food_id + '/' + window.username + '/', function( data ) {

      console.log(data);

      $('.sub-name').text(data.name);
      $('.title .food-name').text(data.name);
      $('.restaurant .name').text(data.restaurant).wrap('<a href="restaurant.html?id=' + data.restaurant_id + '"></a>');
      $('.main-buttons .full').wrap('<a href="restaurant.html?id=' + data.restaurant_id + '"></a>');

      $('.main-photo > img').attr('src', 'images/' + data.photo);

      $('.description .text').text(data.description);

      $('.liked-overlay .num').text(data.num_likes);

      var liked_by = '';

      $.each(data.liked_by, function(index, user) {
        liked_by += '<a href="user.html?id=' + user.user_id + '"><img src="images/' + user.photo + '" /></a>';
      });

      $('.liked-overlay').prepend(liked_by);

      if (data.num_likes <= 7) {
        $('.more .fa-angle-right').hide();
      }

      if (data.is_liked) {
        $('.overlay .fa-thumbs-o-up').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');
      } else if (data.is_disliked) {
        $('.overlay .fa-thumbs-o-down').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-down');
      }

      // var template = $('.template').children().first().clone();

      // thisTemplate.find('.name').text(food.name);
      // thisTemplate.find('.price').text(food.price);
      // /*jshint camelcase: false */
      // thisTemplate.find('.num_likes .num').text(food.num_likes);
      // thisTemplate.find('.food-photo img').attr('src', 'images/' + food.photo);

      // thisTemplate.find('.food-photo, .info').wrap('<a href="food.html?id=' + food.id + '"></a>');

      // $('.main-div').append(thisTemplate);


    });
})();