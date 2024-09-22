/* * * * * * * * * * * * * * * * * * * * * * * *
 * checkout-products-slider.js
 */
function initCheckoutProductsSlider(sliderElement) {
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 5,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
