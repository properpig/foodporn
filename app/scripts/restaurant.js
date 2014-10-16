/*jshint camelcase: false */
(function () {
    'use strict';

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);

    var source = $('#restaurant-template').html();
    var template = Handlebars.compile(source);

    var menu_items;
    var menu_source = $('#menu-template').html();
    var menu_template = Handlebars.compile(menu_source);

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
        $('.main-buttons .full').wrap('<a href="directions.html?id=' + data.restaurant_id + '"></a>');

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
          var index = $(this).data('index');

          $('#modal-menu-item').html(menu_template(menu_items[index]));

          var id = $(this).attr('id');
          // show the vignette
          $('#modal-' + id).addClass('open');
          // slide the modal in
          $('#modal-' + id + ' .modal').animate({
            'marginTop': 90
          });

        });

      });
    }

    getDetails();

})();