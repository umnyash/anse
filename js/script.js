"use strict";

/* * * * * * * * * * * * * * * * * * * * * * * *
 * const.js
 */
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
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
document.querySelectorAll('.taber').forEach(taberElement => new Taber(taberElement));
document.querySelectorAll('.size-chart').forEach(initSizeChart);
document.querySelectorAll('.video').forEach(videoElement => new Video(videoElement));
/* * * * * * * * * * * * * * * * * * * * * * * */