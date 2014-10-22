(function () {
    'use strict';

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    var foodlist;
    var foodIndex = 0;

    getFoodList('');

    var myElement = document.getElementById('food-photo');
    var foodphoto = $('#food-photo img');
    var foodphoto2 = $('#food-photo2 img');

    // set some listeners to the buttons
    var likeButton = $('.controls .fa-thumbs-o-up');
    var dislikeButton = $('.controls .fa-thumbs-o-down');
    dislikeButton.click(function(){
      $.getJSON (window.apiUrl + '/food/dislike/' + foodlist[foodIndex].id + '/' + window.username + '/');
      likeFood(false);
    });
    likeButton.click(function(){
      $.getJSON (window.apiUrl + '/food/like/' + foodlist[foodIndex].id + '/' + window.username + '/');
      likeFood(true);
    });

    $('.controls .fa-info').click(function() {
      window.location='food.html?id=' + foodlist[foodIndex].id;
    });

    $('.controls .fa-question').click(function() {
      $('.instructions').fadeToggle();
    });

    $('.controls .fa-undo').click(function() {
      if (foodIndex === 0) {
        return;
      }
      populateNextFood(--foodIndex);
      $.getJSON (window.apiUrl + '/food/reset/' + foodlist[foodIndex].id + '/' + window.username + '/');
    });

    $('.dismiss-button').click(function() {
      $('.instructions').fadeOut();
    });

    var clickedButton;
    // color the circle
    $('.controls .circle').click(function() {
      clickedButton = $(this);
      clickedButton.addClass('clicked');
      setTimeout(function(){clickedButton.removeClass('clicked');},400);
    });

    $('.food-container').css({
      height: $(window).width()
    });

    $('#food-photo img, #food-photo2 img').css({
      height: $(window).width()
    });

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    // listen to events...
    mc.on('panleft panright tap press', function(ev) {

      if (ev.deltaX < -100 && ev.deltaX > 100) {
        return;
      }

      foodphoto.css({
        'left': ev.deltaX,
        // 'top': ev.deltaY
      });

      if (ev.eventType === 4) {
        foodphoto.css({
          'left': 0,
          'top': 0
        });
      }

    });

    mc.on('swipeleft', function(ev) {
      dislikeButton.click(); // simulate a click to the button
    });

    mc.on('swiperight', function(ev) {
      likeButton.click(); // simulate a click to the button
    });

    mc.on('press tap', function(ev) {
      window.location='food.html?id=' + foodlist[foodIndex].id;
    });

    function getFoodList(extra) {
      $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?explore=true' + extra, function( data ) {
        foodlist = data;
        populateNextFood(0);
      });
    }

    function likeFood(status) {
      var pos = '-100%';
      if (status) {
        pos = '100%';
      }
      foodphoto.animate({
        'left': pos,
        'top': 0,
        'opacity': 0.0
      }, 500, function() {
        populateNextFood(++foodIndex);
        foodphoto.css({
          'left': 0,
          'opacity': 1.0
        });
      });
    }

    function populateNextFood(index) {
      if (index > foodlist.length-1) {
        return;
      }
      $('.info').html(template(foodlist[index]));
      foodphoto.attr('src', 'images/' + foodlist[index].photo);
      if (index+1 !== foodlist.length){
        foodphoto2.attr('src', 'images/' + foodlist[index+1].photo);
        foodphoto2.css('background-image', 'url(images/' + foodlist[index+2].photo + ')');
      }
    }

    $('.main-buttons .submit').click(function() {
      launchFilter();
    });


    function launchFilter() {
      var dietary_ids = [];
      var cuisine_ids = [];

      var extra_query = '';

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

      getFoodList(extra_query);
    }

})();