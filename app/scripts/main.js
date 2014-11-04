/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  // window.apiUrl = 'http://localhost:8000/foodporn';
  window.apiUrl = 'http://128.199.140.174:8000/foodporn';
  window.username = 'john'; // default
  if ('username' in localStorage) {
    window.username = localStorage.getItem('username');
  }

  var container = document.querySelector('.container');

  /**
   * Toggles the class on the container so that
   * we choose the correct view.
   */
  function onViewChange(evt) {
    container.classList.toggle('view-change');

    var hamburger = $('.hamburger');
    if (parseInt(hamburger.css('left').replace('px','')) < -27) {
      hamburger.animate({
        'left': -27,
        'right': 0,
      }, 500, function() {
        // hamburger.toggle('clicked');
      });
    } else {
      hamburger.animate({
        'left': -33,
        'right': 5,
      }, 500, function() {
        // hamburger.toggle('clicked');
      });
    }
  }

  // And switch it back again when you click on the same button
  $('.hamburger-container, .vignette').click(onViewChange);

  // Allow switching of sub nav
  $('.sub-nav-item').click(function() {
    // dont do anything if this is for info page
    if ($(this).hasClass('infopage')) {
      return;
    }
    // first check if this tab is already selected
    // if ($(this).hasClass('selected')) {
    //   return;
    // }
    $('.sub-nav-item').removeClass('selected');
    $(this).addClass('selected');
    window.location.href = $(this).data('link');
  });

  // opening a modal
  $('.main-buttons .full, .main-buttons .half').click(function() {
    var id = $(this).attr('id');
    // show the vignette
    $('#modal-' + id).addClass('open');
    // slide the modal in
    $('#modal-' + id + ' .modal').animate({
      'marginTop': 90
    });

    addCloseButton(id);

  });

  // closing a modal
  $('.modal').click(function(event) {
    // prevent clicks on the child class to propagate to the wrapper
    event.stopPropagation();
  });
  $('.modal-wrapper').click(function() {
    var id = $(this).attr('id');
    $('#' + id + ' .modal').animate({
      'marginTop': 900
    }, 300, function() {
      $('.modal-wrapper').removeClass('open');
    });
  });

  // submitting a modal
  $('.main-buttons .submit').click(function() {
    console.log('do something');

    // simulate clicking to close modal
    $('.modal-wrapper.open').click();

  });

  // hit the back button
  $('.back-button-container').click(function() {
    window.history.back();
  });

  // clearing the search
  $('.app-name .fa-times').click(function() {
    $('#search').val('').focus();
  });

  Handlebars.registerHelper('pluralise', function(num, type) {
    var string = type;
    if (num !== 1) {
      string += 's';
    }
    if (num > 0) {
      return num + ' ' + string;
    }

    return 'No ' + string;
  });

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

  $.getJSON( window.apiUrl + '/login/' + '?username=' + localStorage.getItem('username'), function( data ) {
    var unread_count = 0;
    unread_count += parseInt(localStorage.getItem('deals-unread'));
    unread_count += parseInt(localStorage.getItem('friends-unread'));

    var unread_count_string = '';
    if (unread_count > 0) {
      unread_count_string = ' <span class="unread-count">' + unread_count + '</span>';
    }

    /*jshint multistr: true */
    var navHtml = '<a href="index.html" class="nav-item"><i class="fa fa-cutlery"></i> Food</a> \
        <a href="activity-deals.html" class="nav-item"><i class="fa fa-rss"></i> Activity Feed' + unread_count_string + '</a> \
        <a href="restaurant-following.html" class="nav-item"><i class="fa fa-glass"></i> Restaurants</a> \
        <a href="people-following.html" class="nav-item"><i class="fa fa-users"></i> People</a> \
        <a href="#" class="nav-item"><i class="fa fa-gear"></i> Settings</a> \
        <a href="#" class="nav-item"><i class="fa fa-info-circle"></i> About</a> \
        <a href="logout.html" class="nav-item"><i class="fa fa-sign-out"></i> Logout</a> \
        <a href="user.html?id=' + data.id + '" class="nav-item profile"><img src="images/' + data.photo + '" /><span class="username">' + data.name + '</span></a>';

    $('.navigation-drawer').html(navHtml);

  });

 //  /*
 // * Replace all SVG images with inline SVG
 // */
 //  jQuery('img.logo').each(function(){
 //      var $img = jQuery(this);
 //      var imgID = $img.attr('id');
 //      var imgClass = $img.attr('class');
 //      var imgURL = $img.attr('src');

 //      jQuery.get(imgURL, function(data) {
 //          // Get the SVG tag, ignore the rest
 //          var $svg = jQuery(data).find('svg');

 //          // Add replaced image's ID to the new SVG
 //          if(typeof imgID !== 'undefined') {
 //              $svg = $svg.attr('id', imgID);
 //          }
 //          // Add replaced image's classes to the new SVG
 //          if(typeof imgClass !== 'undefined') {
 //              $svg = $svg.attr('class', imgClass+' replaced-svg');
 //          }

 //          // Remove any invalid XML tags as per http://validator.w3.org
 //          $svg = $svg.removeAttr('xmlns:a');

 //          // Replace image with new SVG
 //          $img.replaceWith($svg);

 //      }, 'xml');

 //      $img.css("display", "inline");

  // });

})();


// function to get the search parameters

/*exported getParameterByName */
function getParameterByName(name) {
  'use strict';
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/*exported addCloseButton */
function addCloseButton(id) {
  // hack to add a close button
  if ($('#modal-' + id + ' .modal').find('.closebutton').length !== 0) {
    return; // means already added before
  };
  $('#modal-' + id + ' .modal').append('<div class="closebutton"></div>').promise().done(function() {
    // clicking the x button
    $('.modal .closebutton').click(function() {
      $('.modal-wrapper').click(); //simulate click on wrapper
    });
  });
}

/*exported scrollToTop */
function scrollToTop() {
  'use strict';
  $('.main-div').animate({
    'scrollTop':   0
  }, 500);
}
