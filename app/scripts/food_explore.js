(function () {
    'use strict';

    // we want to reload the page if the user clicked back
    var d = new Date();
    d = d.getTime();
    if ($('#reloadValue').val().length === 0) {
      $('#reloadValue').val(d);
      $('body').show();
    } else {
      $('#reloadValue').val('');
      location.reload();
    }

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    var historySource = $('#history-template').html();
    var historyTemplate = Handlebars.compile(historySource);

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

    $('.controls .fa-history').click(function() {
      var id = $(this).attr('id');
      // show the vignette
      $('#modal-' + id).addClass('open');
      // slide the modal in
      $('#modal-' + id + ' .modal').animate({
        'marginTop': 90
      });
      addCloseButton(id);

      // load the history
      $.getJSON( window.apiUrl + '/food/history/' + window.username + '/', function( data ) {
        console.log(data);
        $('#modal-history .history-list').html(historyTemplate(data)).promise().done(function() {
          $('.buttons .like').click(function(event) {
            event.stopPropagation();
            var likebutton = $(this);
            if (likebutton.hasClass('selected')) {
              return;
            }
            var dislikebutton = $(this).parent().find('.dislike');
            var clearbutton = $(this).parent().find('.clearlike');
            var id = likebutton.data('id');
            $.getJSON (window.apiUrl + '/food/like/' + id + '/' + window.username + '/', function() {
              likebutton.addClass('selected');
              dislikebutton.removeClass('selected');
              clearbutton.removeClass('selected');
            });
          });
          $('.buttons .dislike').click(function(event) {
            event.stopPropagation();
            var dislikebutton = $(this);
            if (dislikebutton.hasClass('selected')) {
              return;
            }
            var likebutton = $(this).parent().find('.like');
            var clearbutton = $(this).parent().find('.clearlike');
            var id = dislikebutton.data('id');
            $.getJSON (window.apiUrl + '/food/dislike/' + id + '/' + window.username + '/', function() {
              dislikebutton.addClass('selected');
              likebutton.removeClass('selected');
              clearbutton.removeClass('selected');
            });
          });
          $('.buttons .clearlike').click(function(event) {
            event.stopPropagation();
            var id = $(this).data('id');
            var button = $(this);
            var likebutton = button.parent().find('.like');
            var dislikebutton = button.parent().find('.dislike');
            $.getJSON (window.apiUrl + '/food/reset/' + id + '/' + window.username + '/', function() {
              button.addClass('selected');
              likebutton.removeClass('selected');
              dislikebutton.removeClass('selected');
            });
          });

        });
      });
    });

    $('.main-buttons #close').click(function() {
      $('.modal-wrapper.open').click();
      $('#reloadValue').val('');
      location.reload();
    });

    // $('.controls .fa-undo').click(function() {
    //   if (foodIndex === 0) {
    //     return;
    //   }
    //   populateNextFood(--foodIndex);
    //   $.getJSON (window.apiUrl + '/food/reset/' + foodlist[foodIndex].id + '/' + window.username + '/');
    // });

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

    attachHammerListener();
    var timeout;

    function attachHammerListener() {
      mc = new Hammer(myElement);
      // listen to events...
      mc.on('panleft panright', function(ev) {

        if (ev.eventType === 4) {
          foodphoto.animate({
            'left': 0,
            'top': 0
          }, 100);
          return;
        }

        if (ev.deltaX < -100) {
          mc.off('panleft panright tap press swipeleft swiperight');
          dislikeButton.click();
        }

        if (ev.deltaX > 100) {
          mc.off('panleft panright tap press swipeleft swiperight');
          likeButton.click();
        }

        foodphoto.css({
          'left': ev.deltaX,
          // 'top': ev.deltaY
        });


        clearTimeout(timeout);

        timeout = setTimeout(function() {
          foodphoto.animate({
            'left': 0,
            'top': 0
          }, 100);
        }, 500);

      });

      mc.on('swipeleft', function(ev) {
        mc.off('panleft panright tap press swipeleft swiperight');
        dislikeButton.click(); // simulate a click to the button
      });

      mc.on('swiperight', function(ev) {
        mc.off('panleft panright tap press swipeleft swiperight');
        likeButton.click(); // simulate a click to the button
      });

      mc.on('press tap', function(ev) {
        $('.controls .fa-info').click();
      });

    }

    function getFoodList(extra) {
      $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?explore=true' + extra, function( data ) {
        foodlist = data;
        populateNextFood(0);
      }).done(function() {
        if (localStorage.getItem('firsttime') === null) {
          $('.controls .fa-question').click();
          localStorage.setItem('firsttime', true);
        }
      });
    }

    function likeFood(status) {
      var stamp;
      var pos = '-100%';
      if (status) {
        pos = '100%';
        stamp = $('.likestamp');
      } else {
        stamp = $('.dislikestamp');
      }

      stamp.addClass('displayed');
      setTimeout(function(){stamp.removeClass('displayed');},500);

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
        attachHammerListener();
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
      var extra = getSearchQueryFood();
      getFoodList(extra);
    });

})();