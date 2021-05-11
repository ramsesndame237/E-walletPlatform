(function($) {
	
	"use strict";


    // Back to top
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    // Menu sticky
    $(window).on('scroll',function() {    
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
         $(".header-area").removeClass("sticky-header");
        }else{
         $(".header-area").addClass("sticky-header");
        }
     });


	
    //js code for mobile menu toggle
   $(".menu-toggle").on("click", function() {
       $(this).toggleClass("is-active");
   });


    $(".portfolio-gallery").each(function () {
        $(this).find(".popup-gallery").magnificPopup({
            type: "image",
            gallery: {
                enabled: true
            }
        });
    }); 

    $('.video-popup').magnificPopup({
        type: 'iframe',
    });


    // Hero Slider
    $('.hero-area-1').owlCarousel({
        loop:true,
        dots: true,
        autoplay: false,
        mouseDrag: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplayTimeout: 10000,
        smartSpeed: 1000,
        responsive:{
            0:{
                items:1,
                nav:false,
            },
            576:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });



    $(".custom-select-2").each(function() {
        var classes = $(this).attr("class"),
            id      = $(this).attr("id"),
            name    = $(this).attr("name");
        var template =  '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
            template += '<div class="custom-options">';
            $(this).find("option").each(function() {
              template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
        template += '</div></div>';
        
        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
      });
      $(".custom-option:first-of-type").hover(function() {
        $(this).parents(".custom-options").addClass("option-hover");
      }, function() {
        $(this).parents(".custom-options").removeClass("option-hover");
      });
      $(".custom-select-trigger").on("click", function() {
        $('html').one('click',function() {
          $(".custom-select-2").removeClass("opened");
        });
        $(this).parents(".custom-select-2").toggleClass("opened");
        event.stopPropagation();
      });
      $(".custom-option").on("click", function() {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select-2").removeClass("opened");
        $(this).parents(".custom-select-2").find(".custom-select-trigger").text($(this).text());
      });


    // Nice Select
    $('.select-bar').niceSelect();



    //Counter-JS
    $('.count').counterUp({
        delay: 10,
        time: 2000
    });

    
    // packages Slider
    $('.packages').owlCarousel({
    loop:true,
    dots: false,
    autoplay: false,
    margin: 30,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplayTimeout: 5000,
    smartSpeed: 500,
    nav:true,
    navText: [
        '<i class="flaticon-arrow"></i>',
        '<i class="flaticon-arrow-1"></i>'
    ],
    responsive:{
        0:{
            items:1,                
        },
        767:{
            items:2
        },
        1024:{
            items:3           
        },
        1200:{
            items:3
        }
    }
});


    // Review Slider
    $('.reviews').owlCarousel({
        loop:true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        margin: 30,
        nav:false,
        responsive:{
            0:{
                items:1,                
            },
            576:{
                items:1
            },
            1000:{
                items:2
            },
            1024:{
                items:3
            },
            1200:{
                items:3
            }
        }
    });

    
     // service-carousel Slider
     $('.service-carousel').owlCarousel({
        loop:true,
        dots: false,
        autoplay: false,
        margin: 30,
        nav:true,
        navText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"],
        responsive:{
            0:{
                items:1,                
            },
            576:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
	
})(jQuery);