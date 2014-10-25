(function () {
  'use strict';

  var source = $('#restaurant-template').html();
  var template = Handlebars.compile(source);
  var lastExtra = '';
  var listings;

  function linkFollowButton() {
    $('.follow-button').click(function(event) {

      var restaurant_id = $(this).data('id');

      $.getJSON (window.apiUrl + '/restaurant/follow/' + restaurant_id + '/' + window.username + '/', function(data) {
        console.log(data);
      }).done(function() {
        getDetails(lastExtra);
      });

      event.stopPropagation();
    });
  }

  function getDetails(extra) {
    $.getJSON( window.apiUrl + '/restaurants/list/' + window.username + '/?recommended=true' + extra, function( data ) {
      lastExtra = extra;
      listings = data;
      console.log(data);

      if (!$('.mapview').hasClass('listview')) {
        showMap(listings);
        return;
      }

      $('.main-div').html(template({'restaurants': data}));

    }).done(function() {
      linkFollowButton();
    });
  }

  $('.mapview').click(function() {
    $(this).toggleClass('listview');

    if ($(this).hasClass('listview')) {
      $(this).html('<img src="images/icons/map-view.svg" />');
      $('.main-div').html(template({'restaurants': listings})).promise().done(function() {
        linkFollowButton();
      });
      return;
    }

    $(this).html('<i class="fa fa-th-list fa-2x"></i>');

    showMap(listings);

  });

  $('.modal .main-buttons #filters').click(function() {
    var extra = getSearchQueryRestaurant();
    getDetails(extra);
  });

  getDetails('');

})();