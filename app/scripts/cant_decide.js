(function () {
    'use strict';
    var foodlist;
    var foodIndex = 0;

    var myElement = document.getElementById('cant-decide-photo');
    var foodPhoto = $('#cant-decide-photo img');
    var foodPhoto2 = $('#cant-decide-photo2 img');

    $('.modal.short').css({
        height: ($('.modal.short').width() + 50 +'px')
    });

    var mc = new Hammer(myElement);
    attachHammerListener();
    var timeout;

    function attachHammerListener() {
      mc = new Hammer(myElement);

      mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      // listen to events...
      mc.on('panup pandown', function(ev) {

        if (ev.eventType === 4) {
          foodPhoto.animate({
            'left': 0,
            'top': 0
          }, 100);
          return;
        }

        if (ev.deltaY > 100) {
          mc.off('panup pandown tap press swipeleft swiperight');
          $.getJSON (window.apiUrl + '/food/dislike/' + foodlist[foodIndex].id + '/' + window.username + '/');
          likeFood(false);
        }

        if (ev.deltaY < -100) {
          mc.off('panup pandown tap press swipeleft swiperight');
          $.getJSON (window.apiUrl + '/food/like/' + foodlist[foodIndex].id + '/' + window.username + '/');
          likeFood(true);
        }

        foodPhoto.css({
          'top': ev.deltaY,
          // 'top': ev.deltaY
        });


        clearTimeout(timeout);

        timeout = setTimeout(function() {
          foodPhoto.animate({
            'left': 0,
            'top': 0
          }, 100);
        }, 500);

      });

    }

    $('#cant-decide').click(function() {
        $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?explore=true', function( data ) {
            foodlist = data;
            populateNextFood(foodIndex);
        });

        $('.instructions').fadeToggle();

        $('.dismiss-button').click(function() {
            $('.instructions').fadeOut();
        });
    });

    //close modal
    $('#done-screening-btn').click(function(){
        var id = $('.main-div').children().first().attr('class');
        $('.' + id).shuffle();

        $('#modal-cant-decide .modal').animate({
            'marginTop': 900
        }, 300, function() {
            $('#modal-cant-decide').removeClass('open');
        });
    });

    function likeFood(status) {
        var height = foodPhoto.height();
        var pos = height;
        if (status) {
            pos = -height;
        }
        foodPhoto.animate({
            'top': pos,
            'left': 0,
            'opacity': 0.0
        }, 500, function() {
            populateNextFood(++foodIndex);
            foodPhoto.css({
                'top': 0,
                'opacity': 1.0
            });
            attachHammerListener();
        });
    }

    function populateNextFood(index){
        if (index > foodlist.length-1) {
            return;
        }

        foodPhoto.attr('src', 'images/' + foodlist[index].photo);

        if (index+1 !== foodlist.length){
            foodPhoto2.attr('src', 'images/' + foodlist[index+1].photo);
            foodPhoto2.css('background-image', 'url(images/' + foodlist[index+2].photo + ')');
        }

        $('#cant-decide-photo img, #cant-decide-photo2 img').css({
            height: $('.modal.short').width()
        });
    }

    //James Padolsey shuffle
    (function($){
        $.fn.shuffle = function() {

            var allElems = this.get(),
                getRandom = function(max) {
                    return Math.floor(Math.random() * max);
                },
                shuffled = $.map(allElems, function(){
                    var random = getRandom(allElems.length),
                        randEl = $(allElems[random]).clone(true)[0];
                    allElems.splice(random, 1);
                    return randEl;
               });

            this.each(function(i){
                $(this).replaceWith($(shuffled[i]));
            });

            return $(shuffled);
        };
    })(jQuery);

})();