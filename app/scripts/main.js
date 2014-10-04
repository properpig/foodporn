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

  var container = document.querySelector('.container');
  var menuButton = document.querySelector('.hamburger-container');

  /**
   * Toggles the class on the container so that
   * we choose the correct view.
   */
  function onViewChange(evt) {
    container.classList.toggle('view-change');

    var hamburger = $('.hamburger');
    if (parseInt(hamburger.css('left').replace("px","")) < -25) {
      hamburger.animate({
        'left': -25,
        'right': 0,
      }, 500, function() {
        // hamburger.toggle('clicked');
      });
    } else {
      hamburger.animate({
        'left': -30,
        'right': 5,
      }, 500, function() {
        // hamburger.toggle('clicked');
      });
    }
  }

  // And switch it back again when you click on the back button
  menuButton.addEventListener('click', onViewChange);

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
