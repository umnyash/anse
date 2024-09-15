/* * * * * * * * * * * * * * * * * * * * * * * *
 * product.js
 */
function initProduct(productElement) {
  const sliderElement = productElement.querySelector('.product__slider');

  const initSlider = () => {
    const slider = new Swiper(sliderElement, {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
      speed: 500,
      pagination: {
        el: '.product__slider-pagination',
        bulletClass: 'product__slider-pagination-button',
        bulletActiveClass: 'product__slider-pagination-button--current',
        renderBullet: getPaginationButtonCreator(),
        clickable: true
      },
    });
  };

  initProductInfo(productElement.querySelector('.product-info'));

  // Модальное окно с фотографиями и видео
  const modalElement = document.querySelector('[data-modal="product-gallery"]');
  const sliderItemElements = Array.from(sliderElement.querySelectorAll('.product__slider-item'));
  const mediaElements = Array.from(productElement.querySelectorAll('.product__image-wrapper, .product__video-wrapper'));
  const modalMediaElements = modalElement.querySelectorAll('.modal-gallery__list-item');
  new SimpleBar(modalElement, { autoHide: false });

  new Modal(modalElement, {
    onOpenerClick: (evt) => {

      let mediaElementIndex;

      if (laptopWidthMediaQueryList.matches) {
        mediaElementIndex = mediaElements.indexOf(evt.currentTarget);
      } else {
        mediaElementIndex = sliderItemElements.indexOf(evt.currentTarget);
      }

      setTimeout(() => {
        modalMediaElements[mediaElementIndex].scrollIntoView({ behavior: 'smooth' });
      }, 400)
    }
  });

  initSlider();
}
/* * * * * * * * * * * * * * * * * * * * * * * */
