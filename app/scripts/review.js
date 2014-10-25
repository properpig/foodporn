/*jshint camelcase: false */

(function () {

   'use strict';

    var query  = window.location.search.substring(1);
    var restaurant_id = query.substring(query.indexOf('=') + 1, query.length);
    var selectedStar;
    var images;
    
    var bName = navigator.appName; 
    var limitnum; 
    var t;

    var myElement = document.getElementById('foodphoto');
    var foodphoto = $('#foodphoto img');
    //var foodphoto2 = $('#foodphoto2 img');
    var image_index=0;

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    getDetails();
    initialize();
    	
    
 
   function getDetails() {

      $.getJSON( window.apiUrl + '/restaurant/' + restaurant_id + '/' + window.username + '/', function( data ) {

        console.log(data);

        $('.sub-name').text(data.name);

       // $('.main-div').html(template(data));

      });

      $.getJSON( window.apiUrl + '/photos/list/', function( data ) {
     		
        	console.log(data);
		images= data;
      		populateNextFood(image_index);
      });

	
  }

   
  function initialize(){
       $('.star').click(function(){
        $(this).toggleClass('selected');
        selectedStar = [];
        $( '.star' ).each(function() {
          if ($(this).hasClass('selected')){
            selectedStar[selectedStar.length] = $(this).attr('id');
          }
        });
      });

     $(document).ready(function(){
  	limitnum = 140;

         $('#submit-review').click(function() {
		$.post(window.apiUrl + '/review/' + window.username + '/',
  		{
		 rating:selectedStar.length,
		 text:$('textarea').val(),
		 photo:images[image_index],    	
		});
	});

    }); 
	
     $('textarea').keyup(function(){
 	 limits($(this), limitnum);
	 t=$(this).val();

      });
	

    $('.food-container').css({
         height: $(window).width()
    });

    $('#food-photo img, #food-photo2 img').css({
         height: $(window).width()
    });
  }

    
    // listen to events...
    mc.on('panleft panright tap press', function(ev) {

      if (ev.deltaX < -100 && ev.deltaX > 100) {
        return;
      }

      foodphoto.css({
        'left': ev.deltaX,
        // 'top': ev.deltaY
      });  

       if (ev.eventType === 4) {
        foodphoto.css({
          'left': 0,
          'top': 0
        });
      }

    });


     mc.on('swipeleft', function(ev) {
        populateNextFood(image_index++);        
    });

     
     function populateNextFood(index) {
      if (index > images.length-1) {
            return;
      }      
      foodphoto.attr('src', 'images/' + images[index]);
      
      /*if (index+1 !== images.length){
        foodphoto2.attr('src', 'images/' + images[index+1]);
        foodphoto2.css('background-image', images[index+2]);
      }*/
    } 


    
   function limits(obj, limit) { 
	var cnt = $("#counter > span"); 
	var txt = $(obj).val(); 
	var len = txt.length; 
	// check if the current length is over the limit 
	if(len > limit){ $(obj).val(txt.substr(0,limit)); 
		$(cnt).html(len-1);
	 } else {
		 $(cnt).html(len); } 
	// check if user has less than 20 chars left 
	if(limit-len <= 20) { 
		$(cnt).addClass("warning");
	}
   }

})();