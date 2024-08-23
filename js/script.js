"use strict";

function createElementByString(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

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
 * main.js
 */
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
/* * * * * * * * * * * * * * * * * * * * * * * */