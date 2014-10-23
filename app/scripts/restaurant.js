/*jshint camelcase: false */
(function () {
    'use strict';

    var restaurant_id = getParameterByName('id');

    var source = $('#restaurant-template').html();
    var template = Handlebars.compile(source);

    var menu_items;
    var menuIndex;
    var menu_source = $('#menu-template').html();
    var menu_template = Handlebars.compile(menu_source);

    var deals_items;
    var dealsIndex;
    var deals_source = $('#deals-template').html();
    var deals_template = Handlebars.compile(deals_source);

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

    function getDetails() {

      $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

        menu_items = data.foods;
        deals_items = data.deals;

        console.log(data);

        $('.sub-name').text(data.name);

        $('.main-div').html(template(data));

      }).done(function() {

        // scroll to reviews if the user landed here from reviews
        if (getParameterByName('nav') === 'reviews') {
          setTimeout(function() {
            $('.infopage').eq(2).click();
            // open the review
            // var index1;
            // var review_id = getParameterByName('review_id');
            // $('.review_items').children().each(function() {
            //   console.log($(this).data('id'));
            // });
          }, 1000);
        }

        $('.follow-button').click(function(event) {

          var restaurant_id = $(this).data('id');

          $.getJSON (window.apiUrl + '/restaurant/follow/' + restaurant_id + '/' + window.username + '/', function(data) {
            getDetails();
          });

          $(this).toggleClass('following');
          event.stopPropagation();
        });

        $('.share-button').click(function(event) {
          $(this).toggleClass('clicked');

          // show the items if this is being clicked
          if ($(this).hasClass('clicked')) {
            // show a different button
            $(this).attr('src', 'images/icons/share.svg');

            $('.circle.share').show();
            $('.circle.share').css({opacity:1.0});
            // display them in a quadrant
            var elems = $('.circle.share');
            var increase = (Math.PI/4) * 2 / elems.length;
            var x = 0, y = 0, angle = Math.PI/2;

            $('.circle.share').each(function() {
              // elem.innerHTML = angle;
              x = 150 * Math.cos(angle);
              y = 160 * Math.sin(angle) - 45;
              $(this).animate({
                right: x,
                top: y
              });
              angle -= increase;
            });
          } else {
            // hide the items
            $('.circle.share').animate({
              right: 0,
              top: 0,
              opacity: 0
            }, function() {
              $('.circle.share').hide();
              $('.share-button').attr('src', 'images/icons/share-o.svg');
            });
          }
        });

        var timeout;
        $('.circle.share').click(function() {
          var type = $(this).data('type');

          // clear the old time out
          clearTimeout(timeout);

          $('.share-confirmation').show();
          $('.share-confirmation .site').text(type);
          $('.share-confirmation').animate({
            bottom: 15,
            opacity: 1.0
          }, 500, function() {
            timeout = setTimeout(function() {
              $('.share-confirmation').animate({
                bottom: -100,
                opacity: 0.0
              }, function() {
                $('.share-confirmation').hide();
              });
            }, 1500);
          });
        });

        $('.menu-items .modal-button').click(function() {
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

        $('.deal-items .modal-button').click(function(){
          dealsIndex = $(this).data('index');

          displayDeals(dealsIndex);

          var id = $(this).attr('id');

          // show the vignette
          $('#modal-' + id).addClass('open');
          // slide the modal in
          $('#modal-' + id + ' .modal').animate({
            'marginTop': $(window).height()/11
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

    function displayDeals(index) {
      var not_first = (index !== 0);
      var not_last = (index !== deals_items.length-1);

      $('#modal-restaurant-deals .modal').html(deals_template({'not_first':not_first, 'not_last':not_last, 'deals':deals_items[index]}));

      // set the height of the menu item so its fixed
      var width = $('#modal-restaurant-deals .photo img').width();
      $('#modal-restaurant-deals .photo img').height(width);

      $('.controls .right').click(function(event) {
        if (dealsIndex === deals_items.length - 1) {
          return;
        }
        displayDeals(++dealsIndex);
        event.stopPropagation();
      });

      $('.controls .left').click(function(event) {
        if (dealsIndex === 0) {
          return;
        }
        displayDeals(--dealsIndex);
        event.stopPropagation();
      });

      //close modal
      $('.main-buttons .close-deals-button').click(function(){
        $('#modal-restaurant-deals .modal').animate({
          'marginTop': 900
        }, 300, function() {
          $('#modal-restaurant-deals').removeClass('open');
        });
      });

    }

    getDetails();
})();