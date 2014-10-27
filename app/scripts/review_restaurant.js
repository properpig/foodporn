(function () {
  'use strict';

  var restaurant_id = getParameterByName('restaurant_id');

  $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

    $('.sub-name').text('Reviewing ' + data.name);
    $('.restaurant-name').text(data.name);

  });

  $('.review-text').click(function() {
    $('.main-div').animate({
      scrollTop: $(document).height()
    });
  });

  var star_count = 0;
  // set listeners on the stars
  $('.star').click(function() {
    star_count = parseInt($(this).data('position'));
    $('.star').removeClass('selected');

    // colour the right stars
    for (var i=0; i<star_count; i++) {
      $('.star:eq(' + i + ')').addClass('selected');
    }
  });

  // setting the word limit here
  var text = '';

  $('.review-text').bind('input propertychange', function() {
    if ($('#reviewtext').val().length > 140) {
      $('#reviewtext').val(text);
      return;
    }

    text = $('#reviewtext').val();
    $('.word-left').text(140 - text.length);
  });

  var photo_url = '';
  // populate the photo container and put the right width
  $.getJSON(window.apiUrl + '/photos/list/', function( data ) {
    var source = $('#review-template').html();
    var template = Handlebars.compile(source);

    $('.photo-container').html(template(data));

    // wait for the first image to load then set the width of the container
    $('.photo img:eq(0)').load(function() {
      var width = $('.photo-container .photo').width();
      $('.photo-container').width(width * data.length - 4); // 5 is the padding between images
    });

  }).done(function() {
    // set listeners to each photo
    $('.photo').click(function() {
      $('.photo').removeClass('selected');
      $(this).addClass('selected');
      photo_url = $(this).data('value');
    });
  });

  $('.submit-review').click(function() {
    var valid = true;
    // some validations
    if (text.length === 0) {
      $('.instructions.text').text('Please enter a review to continue').addClass('error');
      // scroll to the right place
      $('.main-div').animate({
        scrollTop: $(document).height()
      }, 0);
      valid = false;
    }

    if (star_count === 0){
      $('.instructions.rating').text('Please give a rating to continue').addClass('error');
      // scroll to the right place
      $('.main-div').animate({
        scrollTop: 0
      }, 0);
      valid = false;
    }

    if (photo_url.length === 0){
      $('.instructions.photo').text('Please select a photo continue').addClass('error');
      // scroll to the right place
      $('.main-div').animate({
        scrollTop: 0
      }, 0);
      valid = false;
    }

    if (valid) {
      $.post(window.apiUrl + '/review/' + window.username + '/', {
        restaurant_id: restaurant_id,
        rating: star_count,
        text: text,
        photo: photo_url
      }, function(data) {
        console.log(data);
        window.location = 'restaurant.html?id=' + restaurant_id + '&nav=reviews&review_id=' + data.review.id;
      });
    }

  });

})();