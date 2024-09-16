/* * * * * * * * * * * * * * * * * * * * * * * *
 * set-slider.js
 */
function initSetSlider(sliderElement) {
  const listElement = sliderElement.querySelector('.set__slider-list');
  const slideElements = listElement.querySelectorAll('.set__slider-item');
  let slider = null;

  const init = () => {
    sliderElement.classList.add('swiper');
    listElement.classList.add('swiper-wrapper');
    slideElements.forEach((sliderElement) => sliderElement.classList.add('swiper-slide'));

    slider = new Swiper(sliderElement, {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
      speed: 500,
      pagination: {
        el: '.set__slider-pagination',
        bulletClass: 'set__slider-pagination-button',
        bulletActiveClass: 'set__slider-pagination-button--current',
        renderBullet: getPaginationButtonCreator(),
        clickable: true
      },
    });
  }

  const destroy = () => {
    slider?.destroy();
    sliderElement.classList.remove('swiper');
    listElement.classList.remove('swiper-wrapper');
    slideElements.forEach((sliderElement) => sliderElement.classList.remove('swiper-slide'));
  };

  const switchSliderMode = () => {
    if (laptopWidthMediaQueryList.matches) {
      destroy();
    } else {
      init();
    }
  };

  laptopWidthMediaQueryList.addEventListener('change', switchSliderMode);
  switchSliderMode();
}
/* * * * * * * * * * * * * * * * * * * * * * * */
