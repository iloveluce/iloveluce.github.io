var controller;
$(document).ready(function() {

  controller = new ScrollMagic();

  var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#7e3878", "#990000", "#EEAD0E", "#00aba9RGB", "#6B8E23", "#17becf",]

    $("#compsci-link").on("click", function(e){linkhandle(e);})
    $("#code-link").on("click", function(e){linkhandle(e);})
    $("#code-description-link").on("click", function(e){linkhandle(e);})
    $("#ilike-link").on("click", function(e){linkhandle(e);})


    $(".maincontainer").css("height", $(window).height())
    $(".fullscreen").css("min-height", $(window).height())

    var n = Math.floor((Math.random() * 10) );
     $(".mainheader").css("text-shadow", function(){
      return "1px 1px 1px " + color[n]
     } )
    $(".navbar").css("background-color", function(){ return color[n]})
    $(".dropdown-menu").css("background-color", function(){ return color[n]})

    $("head").append(function(){return '<style>figure:before{background:'+  color[n]+ ';}hr{border-top: 2px solid'+ color[n] +';}a{color:'+ color[n] +';}</style>'});

	$(".navbar").css("opacity","0");

    setTimeout(function() {
    $(".navbar").fadeTo(1000,1)}, 500);


    //smooth scrolling
    $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash,
      $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 1200, 'swing', function () {
          window.location.hash = target;
      });
    });


if (is_touch_device()) {
 $('figcaption').addClass('hovered');
}

  var scene = new ScrollScene({triggerElement: "#navy", triggerHook: 0})
        .setPin("#navy")
        .addTo(controller);

// add listeners
scene.on("enter", function(){
 $("#projectdrop").toggleClass("dropup")
});
});


function linkhandle (e){
  e.preventDefault();
  var id = e.currentTarget.id.replace("-link", '');
  e.currentTarget.remove()
  $("#"+id).removeClass("hide")
}

function is_touch_device() {
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Press accordion functionality
    const pressHeaders = document.querySelectorAll('.press-header');
    pressHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all other press items
            document.querySelectorAll('.press-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('.nav-content').prepend(mobileNavToggle);

    mobileNavToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});