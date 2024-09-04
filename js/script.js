"use strict";

/* * * * * * * * * * * * * * * * * * * * * * * *
 * const.js
 */
const MODAL_ANIMATION_DURATION = 500; // Соответствует $duration-l в variables.scss

const KeyCode = Object.freeze({
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
  UP_ARROW: 'ArrowUp',
  SPACE: 'Space',
  ESCAPE: 'Escape'
});
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
function lockPageScroll() {
  const bodyWidth = document.body.clientWidth;
  document.body.classList.add('scroll-lock');
  if (document.body.clientWidth === bodyWidth) {
    return;
  }
  document.body.style.paddingRight = `${document.body.clientWidth - bodyWidth}px`;
}
function unlockPageScroll() {
  document.body.classList.remove('scroll-lock');
  document.body.style.paddingRight = '0';
}
function createElementByString(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}
function isDownArrowEvent(evt) {
  return evt.code === KeyCode.DOWN_ARROW;
}
function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}
function isLeftArrowEvent(evt) {
  return evt.code === KeyCode.LEFT_ARROW;
}
function isRightArrowEvent(evt) {
  return evt.code === KeyCode.RIGHT_ARROW;
}
function isSpaceEvent(evt) {
  return evt.code === KeyCode.SPACE;
}
function isUpArrowEvent(evt) {
  return evt.code === KeyCode.UP_ARROW;
}
function debounce(callback) {
  var _this = this;
  let timeoutDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let timeoutId;
  return function () {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(_this, rest), timeoutDelay);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * taber.js
 */
class Taber {
  constructor(taberElement) {
    this.taberElement = taberElement;
    this.init();
  }
  switchTab = (oldTabElement, newTabElement, isInitialization) => {
    if (oldTabElement) {
      oldTabElement.ariaSelected = null;
      oldTabElement.tabIndex = -1;
      oldTabElement.classList.remove('taber__tab--active');
      const oldIndex = this.tabElements.indexOf(oldTabElement);
      this.panelElements[oldIndex].classList.add('taber__panel--hidden');
    }
    if (!isInitialization) {
      newTabElement.focus();
    }
    newTabElement.tabIndex = 0;
    newTabElement.ariaSelected = true;
    newTabElement.classList.add('taber__tab--active');
    const index = this.tabElements.indexOf(newTabElement);
    this.panelElements[index].classList.remove('taber__panel--hidden');
  };
  openStartTab = () => {
    const targetTabHash = window.location.hash;
    const targetTab = this.tabElements.find(tabElement => tabElement.hash === targetTabHash);
    this.switchTab(null, targetTab || this.tabElements[0], true);
  };
  onTaberListClick = evt => {
    evt.preventDefault();
    const tabElement = evt.target.closest('.taber__tab');
    if (!tabElement) {
      return;
    }
    const currentTabElement = this.listElement.querySelector('[aria-selected]');
    if (tabElement === currentTabElement) {
      return;
    }
    this.switchTab(currentTabElement, tabElement);
  };
  onTaberListKeydown = evt => {
    const index = this.tabElements.indexOf(evt.target);
    if (!isDownArrowEvent(evt) && !isLeftArrowEvent(evt) && !isRightArrowEvent(evt)) {
      return;
    }
    evt.preventDefault();
    if (isDownArrowEvent(evt)) {
      this.panelElements[index].focus();
    } else {
      const newIndex = isLeftArrowEvent(evt) ? index - 1 : index + 1;
      if (!this.tabElements[newIndex]) {
        return;
      }
      this.switchTab(evt.target, this.tabElements[newIndex]);
    }
  };
  init() {
    this.id = this.taberElement.id;
    this.listElement = this.taberElement.querySelector('.taber__list');
    this.tabElements = Array.from(this.listElement.querySelectorAll('.taber__tab'));
    this.panelElements = this.taberElement.querySelectorAll('.taber__panel');
    this.listElement.setAttribute('role', 'tablist');
    this.tabElements.forEach((tabElement, index) => {
      tabElement.role = 'tab';
      tabElement.id = `${this.id}-tab-${index + 1}`;
      tabElement.href = `#${this.id}-panel-${index + 1}`;
      tabElement.tabIndex = -1;
      tabElement.parentNode.role = 'presentation';
    });
    this.panelElements.forEach((panelElement, index) => {
      panelElement.role = 'tabpanel';
      panelElement.id = `${this.id}-panel-${index + 1}`;
      panelElement.tabIndex = -1;
      panelElement.setAttribute('aria-labelledby', this.tabElements[index].id);
      panelElement.classList.add('taber__panel--hidden');
    });
    this.openStartTab();
    this.listElement.addEventListener('click', this.onTaberListClick);
    this.listElement.addEventListener('keydown', this.onTaberListKeydown);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
    this.reviewTextWrapperElements.forEach(textWrapperElement => {
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
  onListClick = evt => {
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 * video.js
 */
class Video {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.posterElement = videoElement.querySelector('.video__poster');
    this.playButtonWrapperElement = videoElement.querySelector('.video__play-button-wrapper');
    this.playButtonElement = videoElement.querySelector('.video__play-button');
    this.playerElement = videoElement.querySelector('.video__player');
    this.init();
  }
  play = () => {
    this.playerElement.play();
    this.playButtonWrapperElement.classList.add('video__play-button-wrapper--hidden');
    this.posterElement.classList.add('video__poster--hidden');
  };
  init() {
    this.playButtonElement.addEventListener('click', () => {
      this.play();
    });
    this.playerElement.addEventListener('ended', () => {
      this.playButtonWrapperElement.classList.remove('video__play-button-wrapper--hidden');
      this.posterElement.classList.remove('video__poster--hidden');
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal.js
 */
class Modal {
  // static openModalsCount = 0;

  constructor(modalElement) {
    let {
      onOpenerClick
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.modalElement = modalElement;
    this.name = modalElement?.dataset.modal;
    this.initOpeners();
    this.modalElement.addEventListener('close', () => this.onModalClose());
    this.onOpenerClick = onOpenerClick;
    this.modalElement.addEventListener('click', evt => {
      if (evt.target === this.modalElement || evt.target.closest('[data-modal-close-button]')) {
        evt.preventDefault();
        this.close();
      }
    });
    if (!document.body.contains(this.modalElement)) {
      document.body.append(this.modalElement);
    }
  }
  initOpeners = () => {
    const openerElements = document.querySelectorAll(`[data-modal-opener="${this.name}"]`);
    openerElements.forEach(openerElement => {
      openerElement.addEventListener('click', evt => {
        evt.preventDefault();
        if (this.onOpenerClick) {
          this.onOpenerClick(evt);
        }
        this.open();
      });
    });
  };
  open = () => {
    this.modalElement.showModal();
  };
  close = () => {
    this.modalElement.close();
  };
  onModalClose = () => {
    setTimeout(() => {
      if (this.modalElement.classList.contains('modal--with_alert')) {
        this.modalElement.remove();
        this.modalElement = null;
      }
    }, MODAL_ANIMATION_DURATION);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-photos.js
 */
let activeButtonElement = null;
function onDocumentClickWhileArticlePhotosButtonExpanded(evt) {
  const captionButtonElement = evt.target.closest('.article__photos button');
  if (!captionButtonElement && activeButtonElement) {
    activeButtonElement.ariaExpanded = 'false';
    activeButtonElement = null;
  }
  document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
}
function initArticlePhotos(photosElement) {
  photosElement.addEventListener('click', evt => {
    const captionButtonElement = evt.target.closest('.article__photos button');
    if (!captionButtonElement) {
      return;
    }
    if (activeButtonElement && activeButtonElement !== captionButtonElement) {
      activeButtonElement.ariaExpanded = 'false';
    }
    const isExpanded = captionButtonElement.ariaExpanded === 'true';
    if (isExpanded) {
      captionButtonElement.ariaExpanded = 'false';
      activeButtonElement = null;
      document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    } else {
      captionButtonElement.ariaExpanded = 'true';
      activeButtonElement = captionButtonElement;
      document.addEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    }
    evt.stopPropagation();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-seasons.js
 */
function initArticleSeasons(wrapperElement) {
  const sliderElement = createElementByString(`
    <div class="seasons-slider swiper">
      <p class="seasons-slider__pagination"></p>
    </div>
  `);
  const listElement = wrapperElement.querySelector('ul');
  sliderElement.append(listElement);
  listElement.classList.add('seasons-slider__list', 'swiper-wrapper');
  const slideElements = listElement.querySelectorAll('li');
  slideElements.forEach(slideElement => slideElement.classList.add('seasons-slider__item', 'swiper-slide'));
  wrapperElement.append(sliderElement);
  new Swiper(sliderElement, {
    effect: 'flip',
    speed: 600,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.seasons-slider__pagination',
      clickable: true,
      bulletClass: 'seasons-slider__pagination-button',
      bulletActiveClass: 'seasons-slider__pagination-button--active',
      renderBullet: (index, className) => `
        <button class='${className}' type='button'>
          ${slideElements[index].dataset.label}
        </button>
      `
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
      lockClass: 'slider-arrows__button--hidden'
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 60
      },
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 103
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 144
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-preview-slider.js
 */
function initCatalogPreviewSlider(sliderElement) {
  const paginationElement = sliderElement.querySelector('.slider-pagination');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: paginationElement,
      type: 'progressbar'
    },
    breakpoints: {
      390: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      790: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * consumers-photos-slider.js
 */
function initConsumersPhotosSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.consumers-photos__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const paginationElement = sliderWrapperElement.querySelector('.slider-pagination');
  const slider = new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    pagination: {
      el: paginationElement,
      type: 'progressbar'
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
  return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * consumers-photos.js
 */
function initConsumersPhotos() {
  let slider = null;
  let slideElements = null;
  const sliderElement = document.querySelector('.consumers-photos__slider-wrapper');
  if (sliderElement) {
    slideElements = Array.from(sliderElement.querySelectorAll('.consumers-photos__slider-item '));
    slider = initConsumersPhotosSlider(sliderElement);
  }
  let consumersPhotosModal = null;
  let modalSlider = null;
  const consumersPhotosModalElement = document.querySelector('[data-modal="consumers-photos"]');
  if (consumersPhotosModalElement) {
    modalSlider = initGallerySlider(consumersPhotosModalElement.querySelector('.gallery-slider'));
    consumersPhotosModal = new Modal(consumersPhotosModalElement, {
      onOpenerClick: evt => {
        const listItemElement = evt.target.closest('li');
        if (listItemElement && modalSlider) {
          const listItemNumber = slideElements.indexOf(listItemElement);
          modalSlider.slideTo(listItemNumber, 0);
        }
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery-slider.js
 */
function initGallerySlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.gallery-slider__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const slider = new Swiper(sliderElement, {
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    },
    speed: 500,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true
  });
  return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * page-scrollbar.js
 */
function initPageScrollbar(pageInnerElement) {
  new SimpleBar(pageInnerElement);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * review-slider.js
 */
function initReviewSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.review__slider');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
      onOpenerClick: evt => {
        const listItemNumber = photoSlideElements.indexOf(evt.currentTarget);
        modalSlider.slideTo(listItemNumber, 0);
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
      lockClass: 'slider-arrows__button--hidden'
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
    spaceBetween: 10
  });
  new Swiper(mainSliderElement, {
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true,
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'shop__thumbnails-slider-item--active'
    },
    breakpoints: {
      390: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 40
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 60
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * size-chart.js
 */
function initSizeChart(sizeChartElement) {
  const tableWrapperElement = sizeChartElement.querySelector('div');
  new SimpleBar(tableWrapperElement, {
    autoHide: false
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */
// initPageScrollbar(document.querySelector('.page__panel'));
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
document.querySelectorAll('.taber').forEach(taberElement => new Taber(taberElement));
document.querySelectorAll('.size-chart').forEach(initSizeChart);
document.querySelectorAll('.video').forEach(videoElement => new Video(videoElement));
document.querySelectorAll('.shop__slider-wrapper').forEach(initShopSlider);
document.querySelectorAll('.simple-filter__slider-wrapper').forEach(initSimpleFilterSlider);
document.querySelectorAll('.review__slider-wrapper').forEach(initReviewSlider);
document.querySelectorAll('.brands').forEach(initBrandsSlider);
document.querySelectorAll('.catalog-preview .products-slider').forEach(initCatalogPreviewSlider);
let reviews = null;
let reviewsElement = document.querySelector('.reviews');
if (reviewsElement) {
  reviews = new Reviews(reviewsElement);
}
initReviewsIntroPhotos();
initConsumersPhotos();
/* * * * * * * * * * * * * * * * * * * * * * * */