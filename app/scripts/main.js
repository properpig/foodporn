/*global $:false */
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

  window.apiUrl = 'http://localhost:8000/foodporn';
  // window.apiUrl = 'http://128.199.140.174:8000/foodporn';
  window.username = 'john';

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
    // first check if this tab is already selected
    if ($(this).hasClass('selected')) {
      return;
    }
    $('.sub-nav-item').toggleClass('selected');
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
