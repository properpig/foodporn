/*jshint camelcase: false */
(function () {
    'use strict';

    var selectedSort = "";

    $('.sort-bar-icon').click(function(){
      $('.sort-bar-icon').removeClass('selected');
      $(this).addClass('selected');
      selectedSort = $(this).attr('value');
    });

    $('ul.cuisine-list li').hide().slice(0, 4).show();
    var askForLoad = false;
    var selectedCuisine = [];

    $( '#cuisine-load' ).click(function() {
      if (!askForLoad){
        $('ul.cuisine-list li').show();
        askForLoad = true;
        $('#cuisine-load').html('Hide');
      } else {
        $('ul.cuisine-list li').hide().slice(0, 4).show();
        askForLoad = false;
        $('#cuisine-load').html('Load more');
      }
    });

    $('.cuisine-list li').click(function(){
      $(this).toggleClass('selected');
      selectedCuisine = [];
      $( '.cuisine-list li' ).each(function() {
        if ($(this).hasClass('selected')){
          selectedCuisine[selectedCuisine.length] = $(this).attr('value');
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


})();