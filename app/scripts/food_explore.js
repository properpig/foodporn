(function () {
    'use strict';

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    var foodlist;
    var foodIndex = 0;

    getFoodList();

    var myElement = document.getElementById('food-photo');
    var foodphoto = $('#food-photo img');
    var foodphoto2 = $('#food-photo2 img');

    // position the info so its visible
    $('.info').css({
      marginTop: $(window).width()
    });

    $('#food-photo img, #food-photo2 img').css({
      height: $(window).width()
    });

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    // listen to events...
    mc.on('panleft panright tap press', function(ev) {

      foodphoto.css({
        'left': ev.deltaX,
        'top': ev.deltaY
      });

      if (ev.eventType === 4) {
        foodphoto.css({
          'left': 0,
          'top': 0
        });
      }

    });

    mc.on('swipeleft swiperight', function(ev) {

      foodphoto.css({
        'left': 0,
        'top': 0
      });

      populateNextFood(foodIndex++);
    });

    foodphoto.click(function() {
      console.log('e');
    });

    function getFoodList() {
      $.getJSON( window.apiUrl + '/food/list/' + window.username + '/', function( data ) {
        foodlist = data;
        populateNextFood(0);
      });
    }

    function populateNextFood(index) {
      if (index === foodlist.length) {
        return;
      }
      $('.info').html(template(foodlist[index]));
      foodphoto.attr('src', 'images/' + foodlist[index].photo);
      if (index+1 !== foodlist.length){
        foodphoto2.attr('src', 'images/' + foodlist[index+1].photo);
      }
    }

})();