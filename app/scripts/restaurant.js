/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);

    Handlebars.registerHelper('rating_stars', function(rating_num, num_reviews) {
      var i;
      var rating = '';
      for (i=0; i<rating_num; i++) {
        rating += '<i class="fa fa-star"></i>';
      }
      for (i=0; i<5-rating_num; i++) {
        rating += '<i class="fa fa-star-o"></i>';
      }

      return rating + ' ' + num_reviews;

    });

    $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

      console.log(data);

      $('.sub-name').text(data.name);
      $('.main-buttons .full').wrap('<a href="directions.html?id=' + data.restaurant_id + '"></a>');


      var source = $('#restaurant-template').html();
      var template = Handlebars.compile(source);

      $('.main-div').append(template(data));

    });
})();