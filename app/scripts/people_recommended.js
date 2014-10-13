/*global $:false */
(function () {
    'use strict';

    Handlebars.registerHelper('pluralise', function(num, type) {
      var string = type;
      if (num != 1) {
        string += 's';
      }
      return num + " " + string;
    });

    $.getJSON( window.apiUrl + '/people/recommended/' + window.username + '/', function( data ) {

      var source = $("#person-template").html();
      var template = Handlebars.compile(source);

      var users = {'users': data};

      $('.main-div').append(template(users));

    });

})();