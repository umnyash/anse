/* * * * * * * * * * * * * * * * * * * * * * * *
 * set.js
 */
function initSet(setElement) {
  const sliderElement = setElement.querySelector('.set__slider');
  const slideElements = Array.from(sliderElement.querySelectorAll('.set__slider-item'));

  console.log(slideElements)

  const modalElement = document.querySelector('[data-modal="set-gallery"]');
  const modalMediaElements = modalElement.querySelectorAll('.modal-gallery__list-item');
  new SimpleBar(modalElement, { autoHide: false });

  console.log(modalMediaElements)

  new Modal(modalElement, {
    onOpenerClick: (evt) => {
      const slideElementIndex = slideElements.indexOf(evt.currentTarget);

      console.log('Click on', evt.currentTarget)

      setTimeout(() => {
        modalMediaElements[slideElementIndex].scrollIntoView({ behavior: 'smooth' });
      }, 400)
    }
  });

  initSetSlider(sliderElement);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
