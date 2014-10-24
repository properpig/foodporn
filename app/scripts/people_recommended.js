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
          var follow_count = parseInt($(this).data('count'));
          var following_span = $(this).parent().find('.stats .followers');

          $.getJSON (window.apiUrl + '/user/follow/' + user_id + '/' + window.username + '/', function(data) {

            if (data.status === 'success') {
              follow_button.toggleClass('following');
              if (data.message === 'followed') {
                follow_count++;
              } else {
                follow_count--;
              }
              following_span.html('<i class="fa fa-users"></i> ' + follow_count);
            }
          });

          event.stopPropagation();

        });

      });

    }

    getDetails('');

    $('.main-buttons .submit').click(function() {
      var extra = getSearchQueryPeople();
      getDetails(extra);
    });

})();