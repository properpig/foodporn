/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var food_id = query.substring(query.indexOf('=') + 1, query.length);

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    function getDetails() {

      $.getJSON( window.apiUrl + '/food/' + food_id + '/' + window.username + '/', function( data ) {
        console.log(data);
        $('.sub-name').text(data.name);
        $('.main-buttons .full').wrap('<a href="restaurant.html?id=' + data.restaurant_id + '"></a>');

        $('.main-div').html(template(data));

      }).done(function() {

        // attach listeners for like/dislike
        $('.fa-thumbs-o-up, .fa-thumbs-up').click(function() {
          $.getJSON (window.apiUrl + '/food/like/' + food_id + '/' + window.username + '/', function(data) {
            if (data.status === 'success') {
              getDetails();
            }
          });
        });

        $('.fa-thumbs-o-down, .fa-thumbs-down').click(function() {
          $.getJSON (window.apiUrl + '/food/dislike/' + food_id + '/' + window.username + '/', function(data) {
            if (data.status === 'success') {
              getDetails();
            }
          });
        });

      });

    }

    getDetails();

})();