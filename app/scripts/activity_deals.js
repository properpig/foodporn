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
    });
  });

})();