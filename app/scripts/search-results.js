(function () {
  'use strict';

  // function to get the search parameters
  function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  var search_type = getParameterByName('type');
  var search_query = window.location.search.substring(1);

  // then underline the correct sub nav item and the right main buttons and placeholder
  if (search_type === 'food') {
    $('.sub-nav-item').eq(0).addClass('selected');
    $('#search').attr('placeholder', 'Search for Food');
  } else if (search_type === 'restaurants') {
    $('.sub-nav-item').eq(1).addClass('selected');
    $('.container > .main-buttons').children().toggleClass('hidden');
    $('#search').attr('placeholder', 'Search for Restaurants');
  } else {
    $('.sub-nav-item').eq(2).addClass('selected');
    $('#search').attr('placeholder', 'Search for People');
  }

  // and populate the search field
  $('#search').val(getParameterByName('search'));

  var foodSource = $('#food-template').html();
  var restaurantSource = $('#restaurants-template').html();
  var peopleSource = $('#people-template').html();
  var template;

  function getResults(extra) {

    if (extra) {
      search_query = extra;
    }

    $.getJSON( window.apiUrl + '/' + search_type + '/list/' + window.username + '/?' + search_query, function( data ) {

      console.log(data);

      if (search_type === 'food') {
        template = Handlebars.compile(foodSource);
      } else if (search_type === 'restaurants') {
        template = Handlebars.compile(restaurantSource);
      } else {
        template = Handlebars.compile(peopleSource);
      }

      $('.main-div').html(template(data));

    }).done(function() {

        $('.follow-button').click(function() {

          var user_id = $(this).data('id');
          var follow_button = $(this);
          var following_span = $(this).parent().find('.followers');
          var original_following = parseInt(following_span.text().split(' ')[0]);

          $.getJSON (window.apiUrl + '/user/follow/' + user_id + '/' + window.username + '/', function(data) {

            if (data.status === 'success') {
              follow_button.toggleClass('following');
              if (data.message === 'followed') {
                following_span.text((original_following+1) + ' Followers');
              } else {
                following_span.text((original_following-1) + ' Followers');
              }
            }
          });

          event.stopPropagation();

        });

    });

  }

  // only for the search people page
  $('.main-buttons .submit-search').click(function() {
    var extra;
    if (getParameterByName('type') === 'food') {
      extra = getSearchQueryFood();
    } else if (getParameterByName('type') === 'restaurants') {
      extra = getSearchQueryRestaurant();
    } else {
      extra = getSearchQueryPeople();
    }

    getResults(extra);
  });

  getResults(null);

  // $('#search').keyup(function (e) {
  //     if (e.keyCode === 13) {
  //       var search_term = $('#search').val();
  //       // just change the search term
  //       var search_query_1 = search_query.substring(0,search_query.indexOf('search='));
  //       var search_query_2 = search_query.substring(search_query.indexOf('&', search_query_1.length), search_query.length);
  //       if (search_query.indexOf('&', search_query_1.length) === -1) { // search was the last param
  //         search_query_2 = '';
  //       }
  //       var new_query = search_query_1 + 'search=' + search_term + search_query_2;
  //       window.location = 'search-results.html?' + new_query;
  //     }
  // });

})();