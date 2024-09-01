/* * * * * * * * * * * * * * * * * * * * * * * *
 * review-slider.js
 */
function initReviewSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.review__slider');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true,
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
