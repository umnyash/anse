/* * * * * * * * * * * * * * * * * * * * * * * *
 * consumers-photos-slider.js
 */
function initConsumersPhotosSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.consumers-photos__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const paginationElement = sliderWrapperElement.querySelector('.slider-pagination');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
    },
    pagination: {
      el: paginationElement,
      type: 'progressbar',
      // modifierClass: 'slider-pagination--'
    },
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
