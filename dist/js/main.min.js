
const navToggle = document.getElementById('nav-toggle');
const submenuToggle = document.querySelectorAll('.nav__item--has-children > a');


faqInit();

document.querySelectorAll('input[type=tel]')?.forEach((input) => {
  
  const maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  const mask = IMask(input, maskOptions);

});

navToggle?.addEventListener('click', function() {

  navToggle.classList.toggle('nav-toggle--active');
  document.getElementById('header').classList.toggle('header--nav-active');
  document.body.classList.toggle('overflow-hidden')
});

submenuToggle?.forEach((link) => {

  link.addEventListener('click', function() {

    if( window.innerWidth <= 992 ) {
      this.closest('.nav__item--has-children').querySelector('ul').slideToggle(300, 'flex');
      this.closest('.nav__item--has-children').classList.toggle('nav__item--toggled');
    }

  });

});

window.addEventListener('resize', function() {
  if (window.innerWidth > 992) {
    closeSubMenus(); 
  }
});

// Sliders
const projectGallery = new Swiper('.project__gallery', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  navigation: {
    nextEl: '.project__gallery-nav-btn--next',
    prevEl: '.project__gallery-nav-btn--prev',
  },
  scrollbar: {
    el: '.project__gallery-scroll',
    draggable: true,
  },
});


function closeSubMenus() {
  document.querySelectorAll('.nav__submenu').forEach((submenu) => {
    submenu.style.display = '';
  });
  document.querySelectorAll('.nav__item--toggled').forEach((navItem) => {
    navItem.classList.remove('nav__item--toggled')
  });
}

// Faq init
function faqInit() {
  const faqItems = document?.querySelectorAll('.faq-item__toggle');

  faqItems.forEach((item) => {
    item.addEventListener('click', function(e) {
  
      e.preventDefault();
  
      const container = this.closest('.section');
      const otherItems = container.querySelectorAll('.faq-item--active');
      const parent = this.closest('.faq-item');
      const content = parent.querySelector('.faq-item__content');
      
      parent.classList.toggle('faq-item--active');
      parent.querySelector('.faq-item__content').slideToggle(300);
  
      if( otherItems ) {
        otherItems.forEach(function(elem) {
          elem.querySelector('.faq-item__content').slideToggle(300);
          elem.classList.remove('faq-item--active');
        });
      }
  
  
    });
  });
}

// Slide Toggle Vanilla JS
HTMLElement.prototype.slideToggle = function(duration, displayType) {
  if (this.clientHeight === 0) {
    _s(this, duration, true, displayType);
  } else {
    _s(this, duration, false, displayType);
  }
};

function _s(el, duration, isDown, displayType) {
  
  if (typeof duration === 'undefined') duration = 400;
  if (typeof isDown === 'undefined') isDown = false;
  if (typeof displayType === 'undefined') displayType = 'block';

  el.style.overflow = "hidden";
  if (isDown) el.style.display = displayType;

  var elStyles        = window.getComputedStyle(el);

  var elHeight        = parseFloat(elStyles.getPropertyValue('height'));
  var elPaddingTop    = parseFloat(elStyles.getPropertyValue('padding-top'));
  var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
  var elMarginTop     = parseFloat(elStyles.getPropertyValue('margin-top'));
  var elMarginBottom  = parseFloat(elStyles.getPropertyValue('margin-bottom'));

  var stepHeight        = elHeight        / duration;
  var stepPaddingTop    = elPaddingTop    / duration;
  var stepPaddingBottom = elPaddingBottom / duration;
  var stepMarginTop     = elMarginTop     / duration;
  var stepMarginBottom  = elMarginBottom  / duration;

  var start;

  function step(timestamp) {

    if (start === undefined) start = timestamp;

    var elapsed = timestamp - start;

    if (isDown) {
      el.style.height        = (stepHeight        * elapsed) + "px";
      el.style.paddingTop    = (stepPaddingTop    * elapsed) + "px";
      el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
      el.style.marginTop     = (stepMarginTop     * elapsed) + "px";
      el.style.marginBottom  = (stepMarginBottom  * elapsed) + "px";
    } else {
      el.style.height        = elHeight        - (stepHeight        * elapsed) + "px";
      el.style.paddingTop    = elPaddingTop    - (stepPaddingTop    * elapsed) + "px";
      el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
      el.style.marginTop     = elMarginTop     - (stepMarginTop     * elapsed) + "px";
      el.style.marginBottom  = elMarginBottom  - (stepMarginBottom  * elapsed) + "px";
    }

    if (elapsed >= duration) {
      el.style.height        = "";
      el.style.paddingTop    = "";
      el.style.paddingBottom = "";
      el.style.marginTop     = "";
      el.style.marginBottom  = "";
      el.style.overflow      = "";
      if (!isDown) el.style.display = "none";
    } else {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
