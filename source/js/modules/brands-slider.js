/* * * * * * * * * * * * * * * * * * * * * * * *
 * brands-slider.js
 */
function initBrandsSlider(brandsElement) {
  const sliderElement = brandsElement.querySelector('.brands__slider');
  const prevButtonElement = brandsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = brandsElement.querySelector('.slider-arrows__button--next');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 28,
    grabCursor: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 60,
      },
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 103,
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 144,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
