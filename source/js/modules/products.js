/* * * * * * * * * * * * * * * * * * * * * * * *
 * products-slider.js
 */
function initProducts(productsElement) {
  const sliderElement = productsElement.querySelector('.products-slider');
  const paginationElement = productsElement.querySelector('.slider-pagination');
  const prevButtonElement = productsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = productsElement.querySelector('.slider-arrows__button--next');

  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: paginationElement,
      type: 'progressbar',
    },
    loop: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden',
    },
    breakpoints: {
      390: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      790: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
