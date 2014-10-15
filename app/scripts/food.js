/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var food_id = query.substring(query.indexOf('=') + 1, query.length);

    $.getJSON( window.apiUrl + '/food/' + food_id + '/' + window.username + '/', function( data ) {

      console.log(data);

      $('.sub-name').text(data.name);
      $('.main-buttons .full').wrap('<a href="restaurant.html?id=' + data.restaurant_id + '"></a>');

      var source = $('#food-template').html();
      var template = Handlebars.compile(source);

      $('.main-div').append(template(data));

    });
})();