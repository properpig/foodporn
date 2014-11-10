/*jshint camelcase: false */
(function () {
    'use strict';

  // set the width
  $('#search').width($(window).width() - 64 - 80);
  $('#search, .app-name .fa-times').css('opacity', 1.0);

  // populate the template for pages with filters
  function populateFilters() {

    $('.filter-icon.sort').click(function() {
      $('.filter-icon.sort').removeClass('selected');
      $(this).addClass('selected');
    });

    // likes slider
    $('#likes-slider').noUiSlider({
      start: [1, 150],
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
      start: [1, 30],
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

    setTimeout(function(){prepopulateFields();},500);

  }

  function prepopulateFields() {

    // check if this is an old search
    if (window.location.search.substring(1).length === 0) {
      return;
    }

    var sort = getParameterByName('sort');
    if (sort) {
      $('.sort-filters .filter-icon').each(function() {
        if ($(this).data('value') === sort) {
          $(this).addClass('selected');
        }
      });
    }

    if (getParameterByName('likes_min')) {
      $('#likes-slider').val([parseInt(getParameterByName('likes_min')), null]);
      $('#likes-range .hyphen').show();
    } else {
      $('#likes-slider').val([0, null]);
      $('#likes-range .min').text('< ');
      $('#likes-range .hyphen').hide();
    }

    if (getParameterByName('likes_max')) {
      $('#likes-slider').val([null, parseInt(getParameterByName('likes_max'))]);
    } else {
      $('#likes-slider').val([null, 200]);
      $('#likes-range .max').text('200+');
    }

    if (getParameterByName('followers_min')) {
      $('#followers-slider').val([parseInt(getParameterByName('followers_min')), null]);
      $('#followers-range .hyphen').show();
    } else {
      $('#followers-slider').val([0, null]);
      $('#followers-range .min').text('< ');
      $('#followers-range .hyphen').hide();
    }

    if (getParameterByName('followers_max')) {
      $('#followers-slider').val([null, parseInt(getParameterByName('followers_max'))]);
    } else {
      $('#followers-slider').val([null, 50]);
      $('#followers-range .max').text('50+');
    }

    if (getParameterByName('reviews_min')) {
      $('#reviews-slider').val([parseInt(getParameterByName('reviews_min')), null]);
      $('#reviews-range .hyphen').show();
    } else {
      $('#reviews-slider').val([0, null]);
      $('#reviews-range .min').text('< ');
      $('#reviews-range .hyphen').hide();
    }

    if (getParameterByName('reviews_max')) {
      $('#reviews-slider').val([null, parseInt(getParameterByName('reviews_max'))]);
    } else {
      $('#reviews-slider').val([null, 50]);
      $('#reviews-range .max').text('50+');
    }

  }

  // only for the dedicated search people page
  $('.main-buttons .submit-search-redirect').click(function() {
    var extra = getSearchQueryPeople();
    window.location = 'search-results.html?type=people' + extra;
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

  populateFilters();

})();

// global get search query
/*exported getSearchQueryPeople */
function getSearchQueryPeople() {

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

  // get the search term
  var search_term = $('#search').val();
  if (search_term) {
    extra_query += '&search=' + search_term;
  }

  console.log(extra_query);
  return extra_query;

}