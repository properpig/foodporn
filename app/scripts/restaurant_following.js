(function () {
  'use strict';

  var source = $('#restaurant-template').html();
  var template = Handlebars.compile(source);

  var listings;

  function linkGetThereButton() {
    $('.get-there-button').click(function(event) {

      var restaurant_id = $(this).data('id');
      window.location = 'directions.html?id=' + restaurant_id;
      event.stopPropagation();
    });
  }

  function getDetails(extra) {
    $.getJSON( window.apiUrl + '/restaurants/list/' + window.username + '/?following=true' + extra, function( data ) {

      listings = data;
      console.log(data);

      if (!$('.mapview').hasClass('listview')) {
        showMap(listings);
        return;
      }

      $('.main-div').html(template({'restaurants': data}));

    }).done(function() {
      linkGetThereButton();
    });
  }

  $('.mapview').click(function() {
    $(this).toggleClass('listview');

    if ($(this).hasClass('listview')) {
      $(this).html('<img src="images/icons/map-view.svg" />');
      $('.main-div').html(template({'restaurants': listings})).promise().done(function() {
        linkGetThereButton();
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