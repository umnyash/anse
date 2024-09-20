/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogSorting(sortingElement) {
  sortingElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.catalog__sorting-toggle-button')) {
      if (sortingElement.classList.contains('catalog__sorting--open')) {
        close();
      } else {
        open();
      }
    } else {
      const linkElement = evt.target.closest('.catalog__sorting-link');

      if (!linkElement) {
        return;
      }

      sortingElement.querySelector('.catalog__sorting-toggle-button').textContent = linkElement.textContent;
      sortingElement.querySelector('.catalog__sorting-link--active')?.classList.remove('catalog__sorting-link--active');
      linkElement.classList.add('catalog__sorting-link--active');

      close();
    }
  });

  function onDocumentClick(evt) {
    const targetElement = evt.target.closest('.catalog__sorting');

    if (targetElement !== sortingElement || evt.target.matches('.catalog__sorting-list')) {
      evt.preventDefault();
      close();
    }
  }

  function open() {
    sortingElement.classList.add('catalog__sorting--open');

    setTimeout(() => {
      document.addEventListener('click', onDocumentClick);
    }, 0)
  };

  function close() {
    sortingElement.classList.remove('catalog__sorting--open');
    document.removeEventListener('click', onDocumentClick);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
