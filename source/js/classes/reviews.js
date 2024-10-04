/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews.js
 */
class Reviews {
  constructor(reviewsElement) {
    this.reviewsElement = reviewsElement;
    this.listElement = reviewsElement.querySelector('.reviews-list');
    this.reviewsWrapperElement = this.listElement.querySelector('.reviews-list__items');
    this.init();
  }

  updateReviewsTextWrappersList = () => {
    this.reviewTextWrapperElements = this.listElement.querySelectorAll('.review__text-wrapper');
  };

  setReviewTextWrapperMode = (textWrapperElement) => {
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
  };

  setReviewsTextWrappersMode = () => {
    this.reviewTextWrapperElements.forEach(this.setReviewTextWrapperMode);
  };

  initReviewSlider = (sliderWrapperElement) => {
    const sliderElement = sliderWrapperElement.querySelector('.review__slider');

    new Swiper(sliderElement, {
      slidesPerView: 'auto',
      spaceBetween: 10,
      grabCursor: true,
    });
  }

  createReviewElement = (review) => {
    const formattedDate = new Date(review.date).toLocaleDateString('ru-RU');

    const reviewSliderItemsString = review.photos?.map((photo) => `
      <li class="review__slider-item swiper-slide">
        <picture class="review__slider-image-wrapper media media--cover media--position_top skeleton">
          <img class="media__image" src="${photo}" width="102" height="128" alt="" loading="lazy">
        </picture>
      </li>
    `).join('');

    const reviewString = `
      <li class="reviews-list__item">
        <article class="review">
          <footer class="review__footer">
            <p class="review__author">${review.author}</p>
            <time class="review__date" datetime="${review.date}">${formattedDate}</time>
          </footer>
          <div class="review__text-wrapper review__text-wrapper--clipped">
            <blockquote class="review__text">${review.text}</blockquote>
            <button class="review__toggle-button" type="button">
              <span class="review__toggle-button-text">Скрыть</span>
              <span class="review__toggle-button-text-clipped">Читать полностью</span>
            </button>
          </div>
          <div class="review__slider-wrapper">
            <div class="review__slider swiper">
              <ul class="review__slider-list swiper-wrapper">
                ${reviewSliderItemsString}
              </ul>
          </div>
        </article>
      </li>
    `;

    return createElementByString(reviewString);
  };

  renderReviews = (reviews) => {
    const reviewElements = reviews.map(this.createReviewElement);
    this.reviewsWrapperElement.append(...reviewElements);

    for (const reviewElement of reviewElements) {
      initSkeletons(reviewElement);
      this.initReviewSlider(reviewElement);
      this.setReviewTextWrapperMode(reviewElement.querySelector('.review__text-wrapper'))
    }

    this.updateReviewsTextWrappersList();
  }

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

    this.reviewsWrapperElement.querySelectorAll('.review__slider-wrapper').forEach(this.initReviewSlider);

    window.addEventListener('resize', this.onWindowResize);
    this.listElement.addEventListener('click', this.onListClick);
  }

}
/* * * * * * * * * * * * * * * * * * * * * * * */
