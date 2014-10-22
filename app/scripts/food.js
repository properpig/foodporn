/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var food_id = query.substring(query.indexOf('=') + 1, query.length);

    var source = $('#food-template').html();
    var template = Handlebars.compile(source);

    function getDetails() {

      $.getJSON( window.apiUrl + '/food/' + food_id + '/' + window.username + '/', function( data ) {
        console.log(data);
        $('.sub-name').text(data.name);
        $('.main-buttons .full').wrap('<a href="restaurant.html?id=' + data.restaurant_id + '"></a>');

        $('.main-div').html(template(data));

      }).done(function() {

        // attach listeners for like/dislike
        $('.fa-thumbs-o-up, .fa-thumbs-up').click(function() {
          $.getJSON (window.apiUrl + '/food/like/' + food_id + '/' + window.username + '/', function(data) {
            if (data.status === 'success') {
              getDetails();
            }
          });
        });

        $('.fa-thumbs-o-down, .fa-thumbs-down').click(function() {
          $.getJSON (window.apiUrl + '/food/dislike/' + food_id + '/' + window.username + '/', function(data) {
            if (data.status === 'success') {
              getDetails();
            }
          });
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
              x = 155 * Math.cos(angle);
              y = 170 * Math.sin(angle) + 50;
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
              top: 100,
              opacity: 0
            }, function() {
              $('.circle.share').hide();
              $('.share-button').attr('src', 'images/icons/share-o.svg');
            })
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

      });

    }

    getDetails();

})();