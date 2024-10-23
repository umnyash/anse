/* * * * * * * * * * * * * * * * * * * * * * * *
 * text-field.js
 */
function initTextField(fieldElement) {
  const dataListWrapperElement = fieldElement.querySelector('.text-field__data-list-wrapper');

  if (!dataListWrapperElement) {
    return;
  }

  const dataListElement = dataListWrapperElement.querySelector('.text-field__data-list');

  const updateBlur = () => {
    const isScrollableDown = dataListElement.scrollHeight > dataListElement.scrollTop + dataListElement.clientHeight;
    const isScrollableUp = dataListElement.scrollTop > 0;

    dataListWrapperElement.classList.toggle('text-field__data-list-wrapper--blur-bottom', isScrollableDown);
    dataListWrapperElement.classList.toggle('text-field__data-list-wrapper--blur-top', isScrollableUp);
  };

  const fieldObserver = new MutationObserver(() => {
    if (fieldElement.classList.contains('text-field--list-open')) {
      updateBlur();
    }
  });
  fieldObserver.observe(fieldElement, { attributes: true, attributeFilter: ['class'] });

  const listObserver = new MutationObserver(() => {
    updateBlur();
  });
  listObserver.observe(dataListElement, { childList: true, subtree: true });

  dataListElement.addEventListener('scroll', updateBlur);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
