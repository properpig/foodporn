(function () {
    'use strict';

    $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?liked=true', function( data ) {

      console.log(data);

      var source = $('#food-template').html();
      var template = Handlebars.compile(source);

      $('.main-div').html(template({'foods': data}));
    });

})();