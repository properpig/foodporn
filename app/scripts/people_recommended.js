(function () {
    'use strict';

    var source = $('#person-template').html();
    var template = Handlebars.compile(source);

    Handlebars.registerHelper('pluralise', function(num, type) {
      var string = type;
      if (num !== 1) {
        string += 's';
      }
      return num + ' ' + string;
    });

    function getDetails(extra) {
      $.getJSON( window.apiUrl + '/people/list/' + window.username + '/?recommended=true' + extra, function( data ) {

        var users = {'users': data};

        $('.main-div').html(template(users));

      }).done(function(data) {

        $('.follow-button').click(function() {

          var user_id = $(this).data('id');
          var follow_button = $(this);
          var following_span = $(this).parent().find('.followers');
          var original_following = parseInt(following_span.text().split(' ')[0]);

          $.getJSON (window.apiUrl + '/user/follow/' + user_id + '/' + window.username + '/', function(data) {

            if (data.status === 'success') {
              follow_button.toggleClass('following');
              if (data.message === 'followed') {
                following_span.text((original_following+1) + ' Followers');
              } else {
                following_span.text((original_following-1) + ' Followers');
              }
            }
          });

          event.stopPropagation();

        });

      });

    }

    getDetails('');

    $('.main-buttons .submit').click(function() {
      var extra = getSearchQuery();
      getDetails(extra);
    });

})();