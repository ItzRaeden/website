(function($){
	'use strict'

    $('.slider').each(function() {
        var $this = $(this);
        var $group = $this.find('.slide_group');
        var $slides = $this.find('.slide');
        var bulletArray = [];
        var currentIndex = 0;
        var timeout;
        
        function move(newIndex) {
          var animateLeft, slideLeft;
          
          advance();
          
          if ($group.is(':animated') || currentIndex === newIndex) {
            return;
          }
          
          bulletArray[currentIndex].removeClass('active');
          bulletArray[newIndex].addClass('active');
          
          if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
          } else {
            slideLeft = '-100%';
            animateLeft = '100%';
          }
          
          $slides.eq(newIndex).css({
            display: 'block',
            left: slideLeft
          });
          $group.animate({
            left: animateLeft
          }, function() {
            $slides.eq(currentIndex).css({
              display: 'none'
            });
            $slides.eq(newIndex).css({
              left: 0
            });
            $group.css({
              left: 0
            });
            currentIndex = newIndex;
          });
        }
        
        function advance() {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) {
              move(currentIndex + 1);
            } else {
              move(0);
            }
          }, 4000);
        }
        
        $('.next_btn').on('click', function() {
          if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
          } else {
            move(0);
          }
        });
        
        $('.previous_btn').on('click', function() {
          if (currentIndex !== 0) {
            move(currentIndex - 1);
          } else {
            move(3);
          }
        });
        
        $.each($slides, function(index) {
          var $button = $('<a class="slide_btn">&bull;</a>');
          
          if (index === currentIndex) {
            $button.addClass('active');
          }
          $button.on('click', function() {
            move(index);
          }).appendTo('.slide_buttons');
          bulletArray.push($button);
        });
        
        advance();
      });


      /*Gallery*/

      const btns = document.querySelectorAll("[data-target]");
      const close_modals = document.querySelectorAll(".close-modal");
      const overlay = document.getElementById("overlay");
      
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelector(btn.dataset.target).classList.add("active");
          overlay.classList.add("active");
        });
      });
      
      close_modals.forEach((btn) => {
        btn.addEventListener("click", () => {
          const modal = btn.closest(".metal");
          modal.classList.remove("active");
          overlay.classList.remove("active");
        });
      });
      
      window.onclick = (event) => {
        if (event.target == overlay) {
          const modals = document.querySelectorAll(".metal");
          modals.forEach((modal) => modal.classList.remove("active"));
          overlay.classList.remove("active");
        }
      };


      $('.item-menu button').on('click', function(){
        $('.item-menu button').removeClass('active');
        $(this).addClass('active')
      });


}) (jQuery);