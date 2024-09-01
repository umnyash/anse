/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-intro-photos.js
 */
function initReviewsIntroPhotos() {
  let slider = null;
  let photoSlideElements = null;
  const sliderElement = document.querySelector('.reviews-intro__slider-wrapper');

  if (sliderElement) {
    photoSlideElements = Array.from(sliderElement.querySelectorAll('.reviews-intro__slider-item:not(.reviews-intro__slider-item--quote)'));
    slider = initReviewsIntroSlider(sliderElement);
  }

  let reviewsPhotosModal = null;
  let modalSlider = null;
  const reviewsIntroPhotosModalElement = document.querySelector('[data-modal="reviews-intro-photos"]');

  if (reviewsIntroPhotosModalElement) {
    const modalSliderElement = reviewsIntroPhotosModalElement.querySelector('.gallery-slider');

    modalSlider = initGallerySlider(modalSliderElement);

    reviewsPhotosModal = new Modal(reviewsIntroPhotosModalElement, {
      onOpenerClick: (evt) => {
        const listItemNumber = photoSlideElements.indexOf(evt.currentTarget);
        modalSlider.slideTo(listItemNumber, 0);
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
