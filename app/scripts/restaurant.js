/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);

    var source = $('#restaurant-template').html();
    var template = Handlebars.compile(source);

    var menu_items;
    var menuIndex;
    var menu_source = $('#menu-template').html();
    var menu_template = Handlebars.compile(menu_source);

    var scrolling = false;

    // call a function everytime the user scrolls
    $('.main-div').scroll(function() {
      var scrollAmt = -$('.main-photo').offset().top - $('.main-div').offset().top;
      if (scrollAmt > 5) {
        $('.sub-nav').removeClass('hidden');
      } else {
        $('.sub-nav').addClass('hidden');
        return;
      }
      if (scrollAmt > 100) {
        scrollAmt = 100;
      }
      $('.sub-nav').css({
        opacity: scrollAmt/100
      });

      if (scrolling) {
        return; // user has clicked on a menu item
      }

      // underline as the user scrolls
      $('.sub-nav').children().each(function(){
        var anchor = $(this).data('anchor');
        var offset = $('.' + anchor).offset().top - $('.main-div').offset().top - $('.sub-nav').offset().top;

        if (offset < 0) {
          $('.sub-nav-item').removeClass('selected');
          $(this).addClass('selected');
        }
      });
    });

    $('.sub-nav-item').click(function() {
      // set the underline at the right place
      $('.sub-nav-item').removeClass('selected');
      $(this).addClass('selected');

      var anchor = $(this).data('anchor');
      scrolling = true;
      $('.main-div').animate({
        'scrollTop':   $('.' + anchor).offset().top - $('.main-photo').offset().top - $('.sub-nav').height()
      }, 1000, function() {
        scrolling = false;
      });
    });

    Handlebars.registerHelper('rating_stars', function(rating_num, num_reviews) {
      var i;
      var rating = '';
      for (i=0; i<rating_num; i++) {
        rating += '<i class="fa fa-star"></i>';
      }
      for (i=0; i<5-rating_num; i++) {
        rating += '<i class="fa fa-star-o"></i>';
      }

      return rating + ' ' + num_reviews;

    });

    function getDetails() {

      $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

        menu_items = data.foods;

        console.log(data);

        $('.sub-name').text(data.name);

        $('.main-div').html(template(data));

      }).done(function() {

        $('.follow-button').click(function(event) {

          var restaurant_id = $(this).data('id');

          $.getJSON (window.apiUrl + '/restaurant/follow/' + restaurant_id + '/' + window.username + '/', function(data) {
            getDetails();
          });

          $(this).toggleClass('following');
          event.stopPropagation();
        });

        $('.modal-button').click(function() {
          menuIndex = $(this).data('index');

          displayMenuItem(menuIndex);

          var id = $(this).attr('id');
          // show the vignette
          $('#modal-' + id).addClass('open');
          // slide the modal in
          $('#modal-' + id + ' .modal').animate({
            'marginTop': $(window).height()/9
          });

        });

      });
    }

    function displayMenuItem(index) {
      var not_first = (index !== 0);
      var not_last = (index !== menu_items.length-1);

      $('#modal-menu-item .modal').html(menu_template({'not_first':not_first, 'not_last':not_last, 'item':menu_items[index]}));

      // set the height of the menu item so its fixed
      var width = $('#modal-menu-item .photo img').width();
      $('#modal-menu-item .photo img').height(width);

      $('.controls .right').click(function(event) {
        if (menuIndex === menu_items.length - 1) {
          return;
        }
        displayMenuItem(++menuIndex);
        event.stopPropagation();
      });

      $('.controls .left').click(function(event) {
        if (menuIndex === 0) {
          return;
        }
        displayMenuItem(--menuIndex);
        event.stopPropagation();
      });
    }

    getDetails();

})();