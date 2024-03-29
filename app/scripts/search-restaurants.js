/*jshint camelcase: false */
(function () {
  'use strict';

  // set the width
  $('#search').width($(window).width() - 64 - 80);
  $('#search, .app-name .fa-times').css('opacity', 1.0);

  var modalTemplate;

  // get the template and kick off
  $.ajax({
    url: 'restaurant-filter.html',
    // cache: true,
    success: function(data) {
      modalTemplate = Handlebars.compile(data);
    }
  }).always(function() {
    populateFilters();
  });

  // populate the template for pages with filters
  function populateFilters() {

    // populate the template for pages with filters
    $.getJSON( window.apiUrl + '/filters/list/', function( data ) {

      if (getParameterByName('type') === 'food' || getParameterByName('type') === 'people') {
        return; // means this is the search result page for another type of search
      }

      $('#modal-filters .modal .filter-area').html(modalTemplate(data)).promise().done(function(){
        setTimeout(function(){prepopulateFields();},500);
      });

      // that means it was the dedicated search page
      if (!$('#modal-filters .modal .filter-area').html()) {
        $('.main-div').html(modalTemplate(data));
      }

      $('.filter-icon.sort').click(function() {
        $('.filter-icon.sort').removeClass('selected');
        $(this).addClass('selected');
      });

      $('.filter-icon.union').click(function() {
        $(this).toggleClass('selected');
      });

      // price slider
      $('#price-slider').noUiSlider({
        start: [0, 40],
        connect: true,
        range: {
          'min': 0,
          'max': 60
        },
        format: wNumb({
          mark: ',',
          decimals: 0,
          prefix: '$'
        }),
      });

      $('#price-slider').Link('lower').to($('#price-range .min'));

      $('#price-slider').Link('upper').to($('#price-range .max'));

      $('#price-range .min').text('< '); //default
      $('#price-range .hyphen').hide();

      $('#price-slider').on({
        slide: function() {
          if ($('#price-range .min').text() === '$0') {
            $('#price-range .min').text('< ');
            $('#price-range .hyphen').hide();
          } else if ($('#price-range .min').text() !== '< ') {
            $('#price-range .hyphen').show();
          }

          if ($('#price-range .max').text() === '$60') {
            $('#price-range .max').text('$60+');
          }
        }
      });

      // distance slider
      $('#distance-slider').noUiSlider({
        start: [0, 20],
        connect: true,
        range: {
          'min': 0,
          'max': 30
        },
        format: wNumb({
          mark: '.',
          decimals: 1,
          postfix: ' km'
        }),
      });

      $('#distance-slider').Link('lower').to($('#distance-range .min'));

      $('#distance-slider').Link('upper').to($('#distance-range .max'));

      $('#distance-range .min').text('Within '); //default
      $('#distance-range .hyphen').hide();

      $('#distance-slider').on({
        slide: function() {
          if ($('#distance-range .min').text() === '0.0 km') {
            $('#distance-range .min').text('Within ');
            $('#distance-range .hyphen').hide();
          } else if ($('#distance-range .min').text() !== 'Within ') {
            $('#distance-range .hyphen').show();
          }

          if ($('#distance-range .max').text() === '30.0 km') {
            $('#distance-range .max').text('30.0 km+');
          }
        }
      });

      // init cuisine filters
      for (var k=4; k<12; k++) {
        $('.cuisine-filters .filter-icon:eq(' + k + ')').hide();
      }

      $('.more-cuisines').click(function() {
        $('.cuisine-filters .filter-icon').show();
        $(this).hide();
      });

      // init amenities filters
      for (var j=4; j<8; j++) {
        $('.amenity-filters .filter-icon:eq(' + j + ')').hide();
      }

      $('.more-amenities').click(function() {
        $('.amenity-filters .filter-icon').show();
        $(this).hide();
      });

      // init other filters
      for (var l=3; l<8; l++) {
        $('.other-filters .filter-icon:eq(' + l + ')').hide();
      }

      $('.more-other').click(function() {
        $('.other-filters .filter-icon').show();
        $(this).hide();
      });

    });

  }

  function prepopulateFields() {

    // check if this is a dedicated page
    if (window.location.pathname.indexOf('/restaurants-recommended.html') !== -1) {
      $('.other-filters .filter-icon').each(function() {
        var filterValue = $(this).data('value');
        if (filterValue === 'recommended') {
          $(this).addClass('selected');
        }
      });
      return;
    }

    if (window.location.pathname.indexOf('/restaurant-following.html') !== -1) {
      $('.other-filters .filter-icon').each(function() {
        var filterValue = $(this).data('value');
        if (filterValue === 'following') {
          $(this).addClass('selected');
        }
      });
      return;
    }

    // check if this is an old search
    if (window.location.search.substring(1).length === 0) {
      return;
    }

    var sort = getParameterByName('sort');
    if (sort.length) {
      $('.sort-filters .filter-icon').each(function() {
        if ($(this).data('value') === sort) {
          $(this).addClass('selected');
        }
      });
    }

    var dietary_ids = getParameterByName('dietary_ids');
    if (dietary_ids.length) {
      dietary_ids = dietary_ids.split(',');
      $('.dietary-filters .filter-icon').each(function() {
        if (dietary_ids.indexOf($(this).data('id').toString()) !== -1) {
          $(this).addClass('selected');
        }
      });
    }

    var cuisine_ids = getParameterByName('cuisine_ids');
    if (cuisine_ids.length) {
      cuisine_ids = cuisine_ids.split(',');
      $('.cuisine-filters .filter-icon').each(function() {
        if (cuisine_ids.indexOf($(this).data('id').toString()) !== -1) {
          $(this).addClass('selected');
        }
      });
    }

    var amenity_ids = getParameterByName('amenity_ids');
    if (amenity_ids.length) {
      amenity_ids = amenity_ids.split(',');
      $('.amenity-filters .filter-icon').each(function() {
        if (amenity_ids.indexOf($(this).data('id').toString()) !== -1) {
          $(this).addClass('selected');
        }
      });
    }

    // other filters
    $('.other-filters .filter-icon').each(function() {
      var filterValue = $(this).data('value');
      if (getParameterByName(filterValue)) {
        $(this).addClass('selected');
      }
    });

    if (getParameterByName('distance_min')) {
      $('#distance-slider').val([parseInt(getParameterByName('distance_min')), null]);
      $('#distance-range .hyphen').show();
    } else {
      $('#distance-slider').val([0, null]);
      $('#distance-range .min').text('Within ');
      $('#distance-range .hyphen').hide();
    }

    if (getParameterByName('distance_max')) {
      $('#distance-slider').val([null, parseInt(getParameterByName('distance_max'))]);
    } else {
      $('#distance-slider').val([null, 30]);
      $('#distance-range .max').text('30.0 km+');
    }

    if (getParameterByName('price_min')) {
      $('#price-slider').val([parseInt(getParameterByName('price_min')), null]);
      $('#price-range .hyphen').show();
    } else {
      $('#price-slider').val([0, null]);
      $('#price-range .min').text('< ');
      $('#price-range .hyphen').hide();
    }

    if (getParameterByName('price_max')) {
      $('#price-slider').val([null, parseInt(getParameterByName('price_max'))]);
    } else {
      $('#price-slider').val([null, 60]);
      $('#price-range .max').text('$60+');
    }

  }

  // only for the dedicated search restaurants page
  $('.main-buttons .submit-search-redirect').click(function() {
    var extra = getSearchQueryRestaurant();
    window.location = 'search-results.html?type=restaurants' + extra;
  });

  // detect enter on search box
  $('#search').keyup(function (e) {
      if (e.keyCode === 13) {
        // simulate click of search now button
        $('.main-buttons .submit-search').click();
        $('.main-buttons .submit-search-redirect').click();
        $(this).blur();
      }
  });

})();

// global get search query
/*exported getSearchQueryRestaurant */
function getSearchQueryRestaurant() {

  'use strict';

  var sort = '';

  var extra_query = '';
  var dietary_ids = [];
  var cuisine_ids = [];
  var amenity_ids = [];

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

  // amenity filters
  $('.amenity-filters .filter-icon').each(function() {
    if ($(this).hasClass('selected')) {
      amenity_ids.push($(this).data('id'));
    }
  });

  extra_query += '&amenity_ids=' + amenity_ids.join();

  // other filters
  $('.other-filters .filter-icon').each(function() {
    if ($(this).hasClass('selected')) {
      extra_query += '&' + $(this).data('value') + '=true';
    }
  });

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

  // get the search term
  var search_term = $('#search');
  if (search_term.val()) {
    extra_query += '&search=' + search_term.val();
  }

  console.log(extra_query);
  return extra_query;

}
