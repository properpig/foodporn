(function () {
  'use strict';

  // set the width
  $('#search').width($(window).width() - 64 - 80);
  $('#search, .app-name .fa-times').css('opacity', 1.0);

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

        scrollToTop();

        $('.follow-button').click(function() {

          if ($(this).hasClass('follow-user')) {

            var user_id = $(this).data('id');
            var follow_button = $(this);
            var follow_count = parseInt(follow_button.data('count'));
            var following_span = follow_button.parent().find('.stats .followers');

            $.getJSON (window.apiUrl + '/user/follow/' + user_id + '/' + window.username + '/', function(data) {

              if (data.status === 'success') {
                follow_button.toggleClass('following');
                if (data.message === 'followed') {
                  follow_count++;
                } else {
                  follow_count--;
                }
                following_span.html('<i class="fa fa-users"></i> ' + follow_count);
                follow_button.data('count', follow_count);
              }
            });

          } else {

            var restaurant_id = $(this).data('id');
            var r_follow_button = $(this);
            var r_follow_count = parseInt(r_follow_button.data('count'));
            var r_following_span = r_follow_button.parent().find('.stats .followers');

            $.getJSON (window.apiUrl + '/restaurant/follow/' + restaurant_id + '/' + window.username + '/', function(data) {
              console.log(data);
            });
            $(this).toggleClass('following');
            if ($(this).hasClass('following')) {
              r_follow_count++;
            } else {
              r_follow_count--;
            }

            r_following_span.html('<i class="fa fa-users"></i> ' + r_follow_count);
            r_follow_button.data('count', r_follow_count);

          }

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