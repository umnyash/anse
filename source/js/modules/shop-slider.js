/* * * * * * * * * * * * * * * * * * * * * * * *
 * shop-slider.js
 */
function initShopSlider(sliderWrapperElement) {
  const mainSliderElement = sliderWrapperElement.querySelector('.shop__main-slider');
  const thumbnailsSliderElement = sliderWrapperElement.querySelector('.shop__thumbnails-slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');

  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
  });

  new Swiper(mainSliderElement, {
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
    },
    grabCursor: true,
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'shop__thumbnails-slider-item--active',
    },
    breakpoints: {
      390: {
        slidesPerView: 'auto',
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
