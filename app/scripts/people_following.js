(function () {
    'use strict';

    Handlebars.registerHelper('pluralise', function(num, type) {
      var string = type;
      if (num !== 1) {
        string += 's';
      }
      return num + ' ' + string;
    });

    var source = $('#person-template').html();
    var template = Handlebars.compile(source);

    function getDetails(extra) {
      $.getJSON( window.apiUrl + '/people/list/' + window.username + '/?following=true' + extra, function( data ) {

        var users = {'users': data};

        $('.main-div').html(template(users));

      });
    }

    getDetails('');

    $('.main-buttons .submit').click(function() {
      var extra = getSearchQuery();
      getDetails(extra);
    });

})();