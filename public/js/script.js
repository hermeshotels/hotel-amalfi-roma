function resizeRectangle() {
	if(parseFloat($(".rectangle-container").css("width")) < parseFloat($("body").css("width")))
	{
		$(".rectangle-container").height(($(".rectangle-container").width() / 2) + 15);
	}
	else {
		$(".rectangle-container").height("auto");
	}
}

function instagramWidget() {

}

function showMenu() {
	$(".menu").show("slide", { direction: "left" }, 1000);
}

function hideMenu() {
	$(".menu").hide("slide", { direction: "left" }, 1000);
}

function dateTimeMenu() {
	var d = new Date();
	$(".menu-header h3 small").html();
}

$(window).resize(function() {
	resizeRectangle();
});

$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('.header-content');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".navbar-default").addClass('navbar-scrolled');
       } else {
          $('.navbar-default').removeClass('navbar-scrolled');
       }
   });
    }
});

$(function() {
	resizeRectangle();
	instagramWidget();
	dateTimeMenu();
	$(".select-language a").click(function(e) {
        $(".current-language").html(e.target.attributes["data-lang"].value+'<span class="caret"></span>');
	});
	$(".menu-opener").click(showMenu);
	$(".menu-closer").click(hideMenu);
});
