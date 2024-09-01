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
      onOpenerClick: (evt) => {
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
