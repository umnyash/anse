/* * * * * * * * * * * * * * * * * * * * * * * *
 * products-counters.js
 */
function initProductsCounters(productsWrapperElement) {
  const toggleButtonsState = (controlElement, buttonMinusElement) => {
    const minValue = +controlElement.min;

    buttonMinusElement.disabled = +controlElement.value <= minValue;
  };

  const toggleAllButtonsState = () => {
    productsWrapperElement.querySelectorAll('.counter').forEach((counterElement) => {
      const controlElement = counterElement.querySelector('.counter__control');
      const buttonMinusElement = counterElement.querySelector('.counter__button--minus');

      toggleButtonsState(controlElement, buttonMinusElement);
    });
  };

  toggleAllButtonsState();

  productsWrapperElement.addEventListener('click', (evt) => {
    const counterButtonElement = evt.target.closest('.counter__button');

    if (!counterButtonElement) {
      return;
    }

    const counterElement = counterButtonElement.closest('.counter');
    const controlElement = counterElement.querySelector('.counter__control');
    const buttonMinusElement = counterElement.querySelector('.counter__button--minus');

    switch (true) {
      case counterButtonElement.matches('.counter__button--minus'):
        controlElement.stepDown();
        break;
      case counterButtonElement.matches('.counter__button--plus'):
        controlElement.stepUp();
        break;
    }

    toggleButtonsState(controlElement, buttonMinusElement);

    controlElement.dispatchEvent(inputEvent);
    controlElement.dispatchEvent(changeEvent);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
