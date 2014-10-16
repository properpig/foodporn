(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/restaurants/list/' + window.username + '/?recommended=true', function( data ) {

      console.log(data);

      var source = $('#restaurant-template').html();
      var template = Handlebars.compile(source);

      $('.main-div').append(template({'restaurants': data}));

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
})();