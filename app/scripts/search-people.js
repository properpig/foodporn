/*jshint camelcase: false */
(function () {
    'use strict';
    var askForDietLoad = false;
    var askForCuisineLoad = false;
    var askForAmenityLoad = false;
    var selectedDiet = [];
    var selectedCuisine = [];
    var selectedAmenity = [];
    var selectedSort = '';
    var search_term = '';

    initialize();



    function initialize(){

      $('.sort-bar-icon-people').click(function(){
        $('.sort-bar-icon-people').removeClass('selected');
        $(this).addClass('selected');
        selectedSort = $(this).attr('value');
      });


      $('.likes-slider').noUiSlider({
        start: [ 0, 1000 ],
        connect: true,
        range: {
          'min': 0,
          'max': 1000
        }
      });
      $('.likes-slider').Link('lower').to($('.likes-display-low'), null, wNumb({
        decimals: 0
      }));
      $('.likes-slider').Link('upper').to($('.likes-display-high'), null, wNumb({
        decimals: 0
      }));

      $('.followers-slider').noUiSlider({
        start: [ 0, 1000 ],
        connect: true,
        range: {
          'min': 0,
          'max': 50
        }
      });
      $('.followers-slider').Link('lower').to($('.followers-display-low'), null, wNumb({
        decimals: 0
      }));
      $('.followers-slider').Link('upper').to($('.followers-display-high'), null, wNumb({
        decimals: 0
      }));

      $('.reviews-slider').noUiSlider({
        start: [ 0, 1000 ],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      });
      $('.reviews-slider').Link('lower').to($('.reviews-display-low'), null, wNumb({
        decimals: 0
      }));
      $('.reviews-slider').Link('upper').to($('.reviews-display-high'), null, wNumb({
        decimals: 0
      }));
    }

    $('.main-buttons').click(function() {
      search_term = $('#search').val();
      var search_query = '&amenity_ids=' + selectedAmenity.join() + '&sort=' + selectedSort + '&search=' + search_term;
      window.location = 'search-results.html?type=people' + search_query;
    });

    $("#search").keyup(function (e) {
        if (e.keyCode == 13) {
          search_term = $('#search').val();
          // simulate click of search now button
          $('.main-buttons').click();
        }
    });

})();