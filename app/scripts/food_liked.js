(function () {
    'use strict';

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    function getData(extra) {

      console.log(window.apiUrl + '/food/list/' + window.username + '/?liked=true' + extra);

      $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?liked=true' + extra, function( data ) {

        console.log(data);

        $('.main-div').html(template({'foods': data}));
      });
    }

    $('.main-buttons .submit').click(function() {
      launchFilter();
    });


    function launchFilter() {
      var dietary_ids = [];
      var cuisine_ids = [];
      var sort = '';

      var extra_query = '';

      // sort filter
      $('.sort-filters .filter-icon').each(function() {
        if ($(this).hasClass('selected')) {
          sort = $(this).data('value');
        }
      });

      extra_query += '&sort=' + sort;

      // dietary filters
      $('.dietary-filters .filter-icon').each(function() {
        if ($(this).hasClass('selected')) {
          dietary_ids.push($(this).data('id'));
        }
      });

      extra_query += '&dietary_ids=' + dietary_ids.join();

      // cuisine filters
      $('.cuisine-filters .filter-icon').each(function() {
        if ($(this).hasClass('selected')) {
          cuisine_ids.push($(this).data('id'));
        }
      });

      extra_query += '&cuisine_ids=' + cuisine_ids.join();

      // get the min price
      if ($('#price-range .min').text() !== '< ') {
        var price_min = $('#price-range .min').text();
        price_min = price_min.substring(1, price_min.length);
        extra_query += '&price_min='+price_min;
      }

      var price_max = $('#price-range .max').text();
      if (price_max.substring(price_max.length-1, price_max.length) !== '+') {
        price_max = price_max.substring(1, price_max.length);
        extra_query += '&price_max='+price_max;
      }

      var distance_min = $('#distance-range .min').text();
      if (distance_min !== 'Within ') {
        distance_min = distance_min.substring(0, distance_min.length-3);
        extra_query += '&distance_min='+distance_min;
      }

      var distance_max = $('#distance-range .max').text();
      if (distance_max.substring(distance_max.length-1, distance_max.length) !== '+') {
        distance_max = distance_max.substring(0, distance_max.length-3);
        extra_query += '&distance_max='+distance_max;
      }

      getData(extra_query);
    }

    getData('');

})();