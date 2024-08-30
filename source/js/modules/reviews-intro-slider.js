/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-intro-slider.js
 */
function initReviewsIntroSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.reviews-intro__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
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
