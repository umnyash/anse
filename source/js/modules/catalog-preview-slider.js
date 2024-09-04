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
      type: 'progressbar',
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
