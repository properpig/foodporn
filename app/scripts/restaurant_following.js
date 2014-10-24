(function () {
  'use strict';

  var source = $('#restaurant-template').html();
  var template = Handlebars.compile(source);

  function getDetails(extra) {
    $.getJSON( window.apiUrl + '/restaurants/list/' + window.username + '/?following=true' + extra, function( data ) {

      console.log(data);

      $('.main-div').html(template({'restaurants': data}));

    }).done(function() {

      $('.get-there-button').click(function(event) {

        var restaurant_id = $(this).data('id');

        window.location = 'directions.html?id=' + restaurant_id;

        event.stopPropagation();
      });

    });
  }

  $('.modal .main-buttons #filters').click(function() {
    var extra = getSearchQueryRestaurant();
    getDetails(extra);
  });

  getDetails('');

})();