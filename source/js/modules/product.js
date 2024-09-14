/* * * * * * * * * * * * * * * * * * * * * * * *
 * product.js
 */
function initProduct(productElement) {
  const sliderElement = productElement.querySelector('.product__slider');

  new Swiper(sliderElement, {
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

  initProductInfo(productElement.querySelector('.product-info'));
}
/* * * * * * * * * * * * * * * * * * * * * * * */
