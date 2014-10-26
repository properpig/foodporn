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
    var foodphoto2 = $('#foodphoto2 img');
    var image_index=0;
    var index=0;

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
		 photo:images[index], 
 		 restaurant_id:restaurant_id	   	
		});
		window.location='restaurant.html?id=' + restaurant_id;
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
    mc.on('panleft panright', function(ev) {

      foodphoto.css({
        'left': ev.deltaX,
        // 'top': ev.deltaY
      });  

      if(ev.type=="panleft" && image_index<images.length){
		index=image_index;
		populateNextFood(image_index++); 
		
      }

      if(ev.type=="panright" && image_index>0){
		populateNextFood(--image_index); 
		index=image_index;
      }

    });

     
    function populateNextFood(index) {
     /* if (index > images.length || index<0) {
            return;
      }*/      
      if (index == images.length-1){
	foodphoto.attr('src', 'images/' + images[index]);
	foodphoto2.attr('src', 'images/blank.png');
      }
      else{
      	foodphoto.attr('src', 'images/' + images[index]);
      	foodphoto2.attr('src', 'images/' + images[index+1]);
      } 
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