/*jshint camelcase: false */
(function () {
  'use strict';

  // populating stuff
  $.getJSON( window.apiUrl + '/activity/deals/', function( data ) {

    var template = $('.template').children().first().clone();

    $.each(data, function(index, deal) {

      var thisTemplate = template.clone();

      thisTemplate.find('.photo img').attr('src', 'images/' + deal.photo);
      thisTemplate.find('.title').text(deal.title);
      thisTemplate.find('.restaurant .name').text(deal.restaurant).wrap('<a href="restaurant.html?id=' + deal.restaurant_id + '"></a>');
      thisTemplate.find('.details').text(deal.details);
      thisTemplate.find('.more').text(deal.more);

      $('.main-div').append(thisTemplate);

    });
  }).done(function() {
    // attaching listeners to the more button
    $('.more-button').click(function() {
      $(this).fadeOut();
      $(this).parent().find('.more').slideDown();

      var dealItem = $(this).parent().parent();
      dealItem.find('.photo').animate({
        height: dealItem.find('.photo img').height(),
      }, 500);
    });

    // highlight the unread things
    if (parseInt(localStorage.getItem('deals-unread')) > 0) {
      $('.sub-nav-item:eq(0) .unread-count').css('display', 'inline-block');
      $('.deal-item:eq(1)').addClass('unread');
      $('.deal-item:eq(2)').addClass('unread');
      setTimeout(function(){
        $('.deal-item').removeClass('unread');
        localStorage.setItem("deals-unread", 0);
      }, 3000);
    };
    if (parseInt(localStorage.getItem('friends-unread')) > 0) {
      $('.sub-nav-item:eq(1) .unread-count').css('display', 'inline-block');
    }

  });

})();