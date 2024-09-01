/* * * * * * * * * * * * * * * * * * * * * * * *
 * simple-filter-slider.js
 */
function initSimpleFilterSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.simple-filter__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled-hidden',
      lockClass: 'slider-arrows__button--hidden',
    },
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 40,
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 60,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
