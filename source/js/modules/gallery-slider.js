/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery-slider.js
 */
function initGallerySlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.gallery-slider__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');

  const slider = new Swiper(sliderElement, {
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
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
    },
    grabCursor: true,
  });

  return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */
