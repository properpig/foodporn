/*jshint camelcase: false */
(function () {
    'use strict';
    var askForDietLoad = false;
    var askForCuisineLoad = false;
    var askForAmenityLoad = false;
    var selectedDiet = [];
    var selectedCuisine = [];
    var selectedAmenity = [];
    var selectedLike=[];
    var search_term = '';

    $.getJSON( window.apiUrl + '/filters/list/', function( data ) {
      var source = $('#cuisine-template').html();
      var template = Handlebars.compile(source);
      console.log(data);
      var cuisines = {'cuisines': data.cuisines};
      $('#cuisine').append(template(cuisines));

      source = $('#diet-template').html();
      template = Handlebars.compile(source);
      var diets = {'diets': data.diets};
      $('#diet').append(template(diets));

      source = $('#amenity-template').html();
      template = Handlebars.compile(source);
      var amenities = {'amenities': data.amenities};
      $('#amenity').append(template(amenities));

      initialize();

    });

    var selectedSort = '';

    function initialize(){

      $('.sort-bar-icon-restaurant').click(function(){
        $('.sort-bar-icon-restaurant').removeClass('selected');
        $(this).addClass('selected');
        selectedSort = $(this).attr('value');
      });

      $('.like-icon').click(function(){
        $(this).toggleClass('selected');
        selectedlike = [];
        $( '.like-icon' ).each(function() {
          if ($(this).hasClass('selected')){
            selectedDiet[selectedDiet.length] = $(this).attr('id');
          }
        });
      });

      $('ul.diet-list li').hide().slice(0, 4).show();

      $( '#diet-load' ).click(function() {
        if (!askForDietLoad){
          $('ul.diet-list li').show();
          askForDietLoad = true;
          $('#diet-load').html('Hide');
        } else {
          $('ul.diet-list li').hide().slice(0, 4).show();
          askForDietLoad = false;
          $('#diet-load').html('Load more');
        }
      });

      $('.diet-list li').click(function(){
        $(this).toggleClass('selected');
        selectedDiet = [];
        $( '.diet-list li' ).each(function() {
          if ($(this).hasClass('selected')){
            selectedDiet[selectedDiet.length] = $(this).attr('id');
          }
        });
      });

      $('ul.cuisine-list li').hide().slice(0, 4).show();

      $( '#cuisine-load' ).click(function() {
        if (!askForCuisineLoad){
          $('ul.cuisine-list li').show();
          askForCuisineLoad = true;
          $('#cuisine-load').html('Hide');
        } else {
          $('ul.cuisine-list li').hide().slice(0, 4).show();
          askForCuisineLoad = false;
          $('#cuisine-load').html('Load more');
        }
      });

      $('.cuisine-list li').click(function(){
        $(this).toggleClass('selected');
        selectedCuisine = [];
        $( '.cuisine-list li' ).each(function() {
          if ($(this).hasClass('selected')){
            selectedCuisine[selectedCuisine.length] = $(this).attr('id');
          }
        });
      });

      $('ul.amenity-list li').hide().slice(0, 4).show();

      $( '#amenity-load' ).click(function() {
        if (!askForAmenityLoad){
          $('ul.amenity-list li').show();
          askForAmenityLoad = true;
          $('#amenity-load').html('Hide');
        } else {
          $('ul.amenity-list li').hide().slice(0, 4).show();
          askForAmenityLoad = false;
          $('#amenity-load').html('Load more');
        }
      });

      $('.amenity-list li').click(function(){
        $(this).toggleClass('selected');
        selectedAmenity = [];
        $( '.amenity-list li' ).each(function() {
          if ($(this).hasClass('selected')){
            selectedAmenity[selectedAmenity.length] = $(this).attr('id');
          }
        });
      });

      $('.price-slider').noUiSlider({
        start: [ 0, 1000 ],
        connect: true,
        range: {
          'min': 0,
          'max': 1000
        }
      });

      $('.price-slider').Link('lower').to($('.price-display-low'));
      $('.price-slider').Link('upper').to($('.price-display-high'));

      $('.location-slider').noUiSlider({
        start: [15],
        connect: 'lower',
        range: {
          'min': 0,
          'max': 30
        }
      });

      $('.location-slider').Link('lower').to($('.location-display-low'));
    }

    $('.main-buttons').click(function() {
      search_term = $('#search').val();
      var search_query = '&amenity_ids=' + selectedAmenity.join() + '&dietary_ids=' + selectedDiet.join() + '&cuisine_ids=' + selectedCuisine.join() + '&sort=' + selectedSort + '&search=' + search_term;
      window.location = 'search-results.html?type=restaurants' + search_query;
    });

    $('#search').keyup(function (e) {
        if (e.keyCode === 13) {
          search_term = $('#search').val();
          // simulate click of search now button
          $('.main-buttons').click();
        }
    });

})();