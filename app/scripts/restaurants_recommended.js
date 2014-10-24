(function () {
  'use strict';

  var source = $('#restaurant-template').html();
  var template = Handlebars.compile(source);

  function getDetails(extra) {
    $.getJSON( window.apiUrl + '/restaurants/list/' + window.username + '/?recommended=true' + extra, function( data ) {

      console.log(data);

      $('.main-div').html(template({'restaurants': data}));

    }).done(function() {

      $('.follow-button').click(function(event) {

        var restaurant_id = $(this).data('id');

        $.getJSON (window.apiUrl + '/restaurant/follow/' + restaurant_id + '/' + window.username + '/', function(data) {
          console.log(data);
        });

        $(this).toggleClass('following');
        event.stopPropagation();
      });

    });
  }

  $('.main-buttons #filters').click(function() {
    var extra = getSearchQueryRestaurant();
    getDetails(extra);
  });

  getDetails('');

})();