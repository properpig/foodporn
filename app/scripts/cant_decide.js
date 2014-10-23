(function () {
    'use strict';
    var foodlist;
    var foodIndex = 0;

    var myElement = document.getElementById('cant-decide-photo');
    var foodPhoto = $('#cant-decide-photo img');

    var mc = new Hammer(myElement);

    // listen to events...
    mc.on('panleft panright', function(ev) {

        if (ev.deltaX < -100 && ev.deltaX > 100) {
            return;
        }

        foodPhoto.css({
            'left': ev.deltaX,
            // 'top': ev.deltaY
        });

        if (ev.eventType === 4) {
            foodPhoto.css({
              'left': 0,
              'top': 0
            });
        }

    });

    mc.on('swipeleft', function(ev) {
        $.getJSON (window.apiUrl + '/food/dislike/' + foodlist[foodIndex].id + '/' + window.username + '/');
        likeFood(false);
    });

    mc.on('swiperight', function(ev) {
        $.getJSON (window.apiUrl + '/food/like/' + foodlist[foodIndex].id + '/' + window.username + '/');
        likeFood(true);
    });

    $('#cant-decide').click(function() {

        $.getJSON( window.apiUrl + '/food/list/' + window.username, function( data ) {
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

        $('.restaurant-item').shuffle();

        $('#modal-cant-decide .modal').animate({
            'marginTop': 900
        }, 300, function() {
            $('#modal-cant-decide').removeClass('open');
        });
    });

    function likeFood(status) {
        var pos = '-100%';
        if (status) {
            pos = '100%';
        }
        foodPhoto.animate({
            'left': pos,
            'top': 0,
            'opacity': 0.0
        }, 500, function() {
            populateNextFood(++foodIndex);
            foodPhoto.css({
                'left': 0,
                'opacity': 1.0
            });
        });
    }

    function populateNextFood(index){
        if (index > foodlist.length-1) {
            return;
        }

        foodPhoto.attr('src', 'images/' + foodlist[index].photo);

        foodPhoto.css({
            height: $('.modal.short').width()
        });

        $('.modal.short').css({
            height: ($('.modal.short').width() + 50 +'px')
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