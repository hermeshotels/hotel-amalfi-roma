function logoPosition() {
	/*
	var logoProportion = 12.43;
	$("#logo").width($("#header .background").width() / logoProportion)
	$("#logo").position({
	    my: "top",
	    at: "center top",
	    of: "#header"
	});
	*/
}

function headerTitlePosition() {
	/*
	$(".header-title").position({
	    my: "center center",
	    at: "center center",
	    of: "#header"
	});
	*/
}

function resizeHeader() {
	/*
	var heightProportion = 1.98;
	$("#header .background").height($("#header .background").width() / heightProportion);
	heightProportion = 2.6;
	$("#header .background.rooms").height($("#header .background.rooms").width() / heightProportion);
	heightProportion = 2.1;
	$("#header .background.contact").height($("#header .background.contact").width() / heightProportion);
	$(".background.noimage").height("auto");
	*/
}

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
	$(".menu").show();
}

function hideMenu() {
	$(".menu").hide();
}

function dateTimeMenu() {
	var d = new Date();
	$(".menu-header h3 small").html();
}

$(window).resize(function() {
	resizeRectangle();
	resizeHeader();
	logoPosition();
	headerTitlePosition();
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
	resizeHeader();
	logoPosition();
	headerTitlePosition();
	instagramWidget();
	dateTimeMenu();
	$(".select-language a").click(function(e) {
        $(".current-language").html(e.target.attributes["data-lang"].value+'<span class="caret"></span>');
	});
	$(".menu-opener").click(showMenu);
	$(".menu-closer").click(hideMenu);
});
