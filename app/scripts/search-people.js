/*jshint camelcase: false */
(function () {
    'use strict';
    // var askForDietLoad = false;
    // var askForCuisineLoad = false;
    // var askForAmenityLoad = false;
    // var selectedDiet = [];
    // var selectedCuisine = [];
    // var selectedAmenity = [];
    // var selectedSort = '';
    // var search_term = '';

    // initialize();



    // function initialize(){

    //   $('.sort-bar-icon-people').click(function(){
    //     $('.sort-bar-icon-people').removeClass('selected');
    //     $(this).addClass('selected');
    //     selectedSort = $(this).attr('value');
    //   });


    //   $('.likes-slider').noUiSlider({
    //     start: [ 0, 1000 ],
    //     connect: true,
    //     range: {
    //       'min': 0,
    //       'max': 1000
    //     }
    //   });
    //   $('.likes-slider').Link('lower').to($('.likes-display-low'), null, wNumb({
    //     decimals: 0
    //   }));
    //   $('.likes-slider').Link('upper').to($('.likes-display-high'), null, wNumb({
    //     decimals: 0
    //   }));

    //   $('.followers-slider').noUiSlider({
    //     start: [ 0, 1000 ],
    //     connect: true,
    //     range: {
    //       'min': 0,
    //       'max': 50
    //     }
    //   });
    //   $('.followers-slider').Link('lower').to($('.followers-display-low'), null, wNumb({
    //     decimals: 0
    //   }));
    //   $('.followers-slider').Link('upper').to($('.followers-display-high'), null, wNumb({
    //     decimals: 0
    //   }));

    //   $('.reviews-slider').noUiSlider({
    //     start: [ 0, 1000 ],
    //     connect: true,
    //     range: {
    //       'min': 0,
    //       'max': 100
    //     }
    //   });
    //   $('.reviews-slider').Link('lower').to($('.reviews-display-low'), null, wNumb({
    //     decimals: 0
    //   }));
    //   $('.reviews-slider').Link('upper').to($('.reviews-display-high'), null, wNumb({
    //     decimals: 0
    //   }));
    // }

    // $('.main-buttons').click(function() {
    //   search_term = $('#search').val();
    //   var search_query = '&amenity_ids=' + selectedAmenity.join() + '&sort=' + selectedSort + '&search=' + search_term;
    //   window.location = 'search-results.html?type=people' + search_query;
    // });

    // $("#search").keyup(function (e) {
    //     if (e.keyCode == 13) {
    //       search_term = $('#search').val();
    //       // simulate click of search now button
    //       $('.main-buttons').click();
    //     }
    // });

  // populate the template for pages with filters
  function populateFilters() {

    $('.filter-icon.sort').click(function() {
      $('.filter-icon.sort').removeClass('selected');
      $(this).addClass('selected');
    });

    // likes slider
    $('#likes-slider').noUiSlider({
      start: [10, 150],
      connect: true,
      range: {
        'min': 0,
        'max': 200
      },
      format: wNumb({
        mark: ',',
        decimals: 0,
      }),
    });

    $('#likes-slider').Link('lower').to($('#likes-range .min'));

    $('#likes-slider').Link('upper').to($('#likes-range .max'));

    $('#likes-slider').on({
      slide: function() {
        if ($('#likes-range .min').text() === '0') {
          $('#likes-range .min').text('< ');
          $('#likes-range .hyphen').hide();
        } else if ($('#likes-range .min').text() !== '< ') {
          $('#likes-range .hyphen').show();
        }

        if ($('#likes-range .max').text() === '200') {
          $('#likes-range .max').text('200+');
        }
      }
    });

    // followers slider
    $('#followers-slider').noUiSlider({
      start: [3, 30],
      connect: true,
      range: {
        'min': 0,
        'max': 50
      },
      format: wNumb({
        mark: '.',
        decimals: 0,
      }),
    });

    $('#followers-slider').Link('lower').to($('#followers-range .min'));

    $('#followers-slider').Link('upper').to($('#followers-range .max'));

    $('#followers-slider').on({
      slide: function() {
        if ($('#followers-range .min').text() === '0') {
          $('#followers-range .min').text('< ');
          $('#followers-range .hyphen').hide();
        } else if ($('#followers-range .min').text() !== '< ') {
          $('#followers-range .hyphen').show();
        }

        if ($('#followers-range .max').text() === '50') {
          $('#followers-range .max').text('50+');
        }
      }
    });

    // reviews slider
    $('#reviews-slider').noUiSlider({
      start: [0, 20],
      connect: true,
      range: {
        'min': 0,
        'max': 50
      },
      format: wNumb({
        mark: ',',
        decimals: 0,
      }),
    });

    $('#reviews-slider').Link('lower').to($('#reviews-range .min'));

    $('#reviews-slider').Link('upper').to($('#reviews-range .max'));

    $('#reviews-range .min').text('< '); //default
    $('#reviews-range .hyphen').hide();

    $('#reviews-slider').on({
      slide: function() {
        if ($('#reviews-range .min').text() === '0') {
          $('#reviews-range .min').text('< ');
          $('#reviews-range .hyphen').hide();
        } else if ($('#reviews-range .min').text() !== '< ') {
          $('#reviews-range .hyphen').show();
        }

        if ($('#reviews-range .max').text() === '50') {
          $('#reviews-range .max').text('50+');
        }
      }
    });

  }

  $('.main-buttons .submit-search').click(function() {
    var extra = getSearchQuery();
    window.location = 'search-results.html?type=people' + extra;
  });

  populateFilters();

})();

// global get search query
/*exported getSearchQuery */
function getSearchQuery() {

  'use strict';

  var sort = '';

  var extra_query = '';

  // sort filter
  $('.sort-filters .filter-icon').each(function() {
    if ($(this).hasClass('selected')) {
      sort = $(this).data('value');
    }
  });

  extra_query += '&sort=' + sort;

  // get the min likes
  if ($('#likes-range .min').text() !== '< ') {
    var likes_min = $('#likes-range .min').text();
    extra_query += '&likes_min='+likes_min;
  }

  var likes_max = $('#likes-range .max').text();
  if (likes_max.substring(likes_max.length-1, likes_max.length) !== '+') {
    extra_query += '&likes_max='+likes_max;
  }

  // get the min followers
  if ($('#followers-range .min').text() !== '< ') {
    var followers_min = $('#followers-range .min').text();
    extra_query += '&followers_min='+followers_min;
  }

  var followers_max = $('#followers-range .max').text();
  if (followers_max.substring(followers_max.length-1, followers_max.length) !== '+') {
    extra_query += '&followers_max='+followers_max;
  }

  // get the min reviews
  if ($('#reviews-range .min').text() !== '< ') {
    var reviews_min = $('#reviews-range .min').text();
    extra_query += '&reviews_min='+reviews_min;
  }

  var reviews_max = $('#reviews-range .max').text();
  if (reviews_max.substring(reviews_max.length-1, reviews_max.length) !== '+') {
    extra_query += '&reviews_max='+reviews_max;
  }
  console.log(extra_query);
  return extra_query;

}