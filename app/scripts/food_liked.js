(function () {
  'use strict';

  var source = $('#food-template').html();
  var template = Handlebars.compile(source);

  function getData(extra) {

    console.log(window.apiUrl + '/food/list/' + window.username + '/?liked=true' + extra);

    $.getJSON( window.apiUrl + '/food/list/' + window.username + '/?liked=true' + extra, function( data ) {

      console.log(data);

      $('.main-div').html(template({'foods': data}));
    });
  }

  $('.main-buttons .submit').click(function() {
    var extra = getSearchQueryFood();
    getData(extra);
  });

  getData('');

})();