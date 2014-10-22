/*jshint camelcase: false */
(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/activity/friends/' + window.username + '/', function( data ) {

      var template_follow_friend = $('.template.follow-friend').children().first().clone();
      var template_follow_restaurant = $('.template.follow-restaurant').children().first().clone();
      var template_achievement = $('.template.achievement').children().first().clone();
      var template_review = $('.template.review').children().first().clone();

      var thisTemplate, i;

      $.each(data, function(index, activity) {

        if (activity.type === 'follow_friend') {

          thisTemplate = template_follow_friend.clone();

          thisTemplate.find('.timesince').text(activity.timestamp);

          thisTemplate.find('.actor-photo img').attr('src', 'images/' + activity.actor_photo).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.actor').text(activity.actor).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.friend').text(activity.friend).wrap('<a href="user.html?id=' + activity.friend_id + '"></a>');
          thisTemplate.find('.photo img').attr('src', 'images/' + activity.friend_photo).wrap('<a href="user.html?id=' + activity.friend_id + '"></a>');

          $('.main-div').append(thisTemplate);

        } else if (activity.type === 'follow_restaurant') {

          thisTemplate = template_follow_restaurant.clone();

          thisTemplate.find('.timesince').text(activity.timestamp);

          thisTemplate.find('.actor-photo img').attr('src', 'images/' + activity.actor_photo).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.actor').text(activity.actor).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.restaurant').text(activity.restaurant).wrap('<a href="restaurant.html?id=' + activity.restaurant_id + '"></a>');
          thisTemplate.find('.photo img').attr('src', 'images/' + activity.restaurant_photo).wrap('<a href="restaurant.html?id=' + activity.restaurant_id + '"></a>');

          $('.main-div').append(thisTemplate);

        } else if (activity.type === 'achievement') {

          thisTemplate = template_achievement.clone();

          thisTemplate.find('.timesince').text(activity.timestamp);

          thisTemplate.find('.actor-photo img').attr('src', 'images/' + activity.actor_photo).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.actor').text(activity.actor).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');

          var foods_liked = '';
          // get the foods this person like
          $.each(activity.foods, function(index, food) {
            foods_liked += '<a href="food.html?id=' + food.food_id + '"><img src="images/' + food.food_photo + '" /></a>';
          });
          thisTemplate.find('.foods').prepend(foods_liked);

          $('.main-div').append(thisTemplate);

        } else {

          thisTemplate = template_review.clone();

          thisTemplate.find('.timesince').text(activity.timestamp);

          thisTemplate.find('.actor-photo img').attr('src', 'images/' + activity.actor_photo).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.actor').text(activity.actor).wrap('<a href="user.html?id=' + activity.actor_id + '"></a>');
          thisTemplate.find('.restaurant').text(activity.restaurant).wrap('<a href="restaurant.html?id=' + activity.restaurant_id + '"></a>');
          thisTemplate.find('.photo img').attr('src', 'images/' + activity.photo).wrap('<a href="restaurant.html?id=' + activity.restaurant_id + '&nav=reviews&review_id=' + activity.review_id + '"></a>');

          var rating = '';
          for (i=0; i<activity.rating; i++) {
            rating += '<i class="fa fa-star"></i>';
          }
          for (i=0; i<5-activity.rating; i++) {
            rating += '<i class="fa fa-star-o"></i>';
          }

          thisTemplate.find('.rating').append(rating);

          $('.main-div').append(thisTemplate);

        }

      });

    }).done(function() {

      // highlight the unread things
      if (parseInt(localStorage.getItem('friends-unread')) > 0) {
        $('.sub-nav-item:eq(1) .unread-count').css('display', 'inline-block');
        $('.activity-item:eq(4)').addClass('unread');
        $('.activity-item:eq(5)').addClass('unread');
        $('.activity-item:eq(6)').addClass('unread');
        setTimeout(function(){
          $('.activity-item').removeClass('unread');
          localStorage.setItem("friends-unread", 0);
        }, 3000);
      };
      if (parseInt(localStorage.getItem('deals-unread')) > 0) {
        $('.sub-nav-item:eq(0) .unread-count').css('display', 'inline-block');
      }
    });
})();