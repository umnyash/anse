/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews.js
 */
class Reviews {
  constructor(reviewsElement) {
    this.reviewsElement = reviewsElement;
    this.listElement = reviewsElement.querySelector('.reviews-list');
    this.init();
  }

  updateReviewsTextWrappersList = () => {
    this.reviewTextWrapperElements = this.listElement.querySelectorAll('.review__text-wrapper');
  };

  setReviewsTextWrappersMode = () => {
    this.reviewTextWrapperElements.forEach((textWrapperElement) => {
      const isClipped = textWrapperElement.classList.contains('review__text-wrapper--clipped');
      textWrapperElement.classList.add('review__text-wrapper--clipped');
      const textElement = textWrapperElement.querySelector('.review__text');

      if (textElement.scrollHeight - textElement.offsetHeight > 5) {
        textWrapperElement.classList.add('review__text-wrapper--clippable');
      } else {
        textWrapperElement.classList.remove('review__text-wrapper--clippable');
      }

      if (!isClipped) {
        textWrapperElement.classList.remove('review__text-wrapper--clipped');
      }
    });
  };

  onWindowResize = debounce(this.setReviewsTextWrappersMode, 500);

  onListClick = (evt) => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');

    if (toggleButtonElement) {
      const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
      textWrapperElement.classList.toggle('review__text-wrapper--clipped');
    }
  };

  init() {
    this.updateReviewsTextWrappersList();
    this.setReviewsTextWrappersMode();

    window.addEventListener('resize', this.onWindowResize);
    this.listElement.addEventListener('click', this.onListClick);
  }

}
/* * * * * * * * * * * * * * * * * * * * * * * */
