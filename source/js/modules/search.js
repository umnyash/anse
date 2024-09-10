/* * * * * * * * * * * * * * * * * * * * * * * *
 * search-form.js
 */
function initSearch(searchWrapperElement) {
  const controlElement = searchWrapperElement.querySelector('.search-form__field-control');
  const clearButtonElement = searchWrapperElement.querySelector('.search-form__field-clear-button');

  const updateClearButtonStatus = () => {
    setTimeout(() => {
      clearButtonElement.classList.toggle('search-form__field-clear-button--hidden', !controlElement.value);
    })
  };

  updateClearButtonStatus();

  controlElement.addEventListener('input', () => {
    updateClearButtonStatus();
  });

  searchWrapperElement.addEventListener('click', (evt) => {
    const controlLabelElement = evt.target.closest('.search__placeholder .button');
    const clearButtonElement = evt.target.closest('.search-form__field-clear-button');

    if (clearButtonElement) {
      controlElement.value = '';
      updateClearButtonStatus();
      controlElement.focus();
      controlElement.dispatchEvent(inputEvent);
      controlElement.dispatchEvent(changeEvent);

      return;
    }

    if (controlLabelElement) {
      controlElement.focus();
      controlElement.selectionStart = controlElement.value.length;
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
