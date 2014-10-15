/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var food_id = query.substring(query.indexOf('=') + 1, query.length);

    var i;

    $.getJSON( window.apiUrl + '/restaurant/' + food_id + '/' + window.username + '/', function( data ) {

      console.log(data);

      $('.sub-name').text(data.name);
      $('.title .restaurant-name').text(data.name);

      $('.main-buttons .full').wrap('<a href="directions.html?id=' + data.restaurant_id + '"></a>');
      $('.get-there-button').wrap('<a href="directions.html?id=' + data.restaurant_id + '"></a>');

      $('.main-photo > img').attr('src', 'images/' + data.photo);

      $('.description .text').text(data.description);

      $('.followed-by .num').text(data.following_count);

      var followed_by = '';

      $.each(data.followed_by, function(index, user) {
        followed_by += '<a href="user.html?id=' + user.user_id + '"><img src="images/' + user.photo + '" /></a>';
      });

      $('.followed-by').prepend(followed_by);

      if (data.following_count <= 7) {
        $('.more .fa-angle-right').hide();
      }

      // if (data.is_liked) {
      //   $('.overlay .fa-thumbs-o-up').removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up');
      // } else if (data.is_disliked) {
      //   $('.overlay .fa-thumbs-o-down').removeClass('fa-thumbs-o-down').addClass('fa-thumbs-down');
      // }

      var rating = '';
      for (i=0; i<data.rating; i++) {
        rating += '<i class="fa fa-star"></i>';
      }
      for (i=0; i<5-data.rating; i++) {
        rating += '<i class="fa fa-star-o"></i>';
      }

      rating += ' <span class="num_review">' + data.reviews_count + '</span>';

      $('.rating').append(rating);

      $('.map .heading').text(data.location_name);

      $('.menu .num').text(data.food_count);

      var foods = '';

      $.each(data.foods, function(index, food) {
        foods += '<a href="food.html?id=' + food.id + '"><img class="food-thumbnail" src="images/' + food.photo + '" /></a>';
      });

      $('.menu-items').prepend(foods);

      var deal_template = $('.template.deal').children().first().clone();
      var thisTemplate;

      $.each(data.deals, function(index, deal) {
        thisTemplate = deal_template.clone();
        thisTemplate.find('.photo img').attr('src', 'images/' + deal.photo);
        thisTemplate.find('.info').text(deal.title);
        thisTemplate.attr('data-details', JSON.stringify(deal));

        $('.deal-items').append(thisTemplate);
      });

      $('.reviews .num').text(data.reviews_count);

      $.each(data.reviews, function(index, review) {
        $('.review-items').append($('<img>',{src:'images/' + review.photo, 'data-info': JSON.stringify(review), 'class': 'food-thumbnail'}));
      });


    });
})();