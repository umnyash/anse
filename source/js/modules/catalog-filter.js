/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogFilter(catalogElement) {
  const filterToggleButtonElement = catalogElement.querySelector('.catalog__filter-button');
  const filterWrapperElement = catalogElement.querySelector('.catalog__filter-wrapper');
  const catalogHeaderElement = catalogElement.querySelector('.catalog__header');
  const filterCloseButtonElement = filterWrapperElement.querySelector('.catalog-filter__close-button');
  const catalogBodyElement = catalogElement.querySelector('.catalog__body');
  const checkerElements = filterWrapperElement.querySelectorAll('.checker__control');
  const clearButtonElement = filterWrapperElement.querySelector('.catalog-filter__clear-button');

  const clearFilter = () => {
    checkerElements.forEach((checkerElement) => {
      checkerElement.checked = false;
      checkerElement.dispatchEvent(inputEvent);
    })
  };

  const setFilterHeight = () => {
    filterWrapperElement.style.height = `${document.documentElement.clientHeight - catalogHeaderElement.getBoundingClientRect().bottom}px`;
  };

  const onWindowResize = () => {
    if (catalogElement.classList.contains('catalog--filter-open')) {
      setFilterHeight();
    }
  };

  function openFilter() {
    lockPageScroll();
    setFilterHeight();
    catalogElement.classList.add('catalog--filter-open');
    catalogBodyElement.addEventListener('click', onCatalogBodyClick);
  };

  function closeFilter() {
    catalogElement.classList.remove('catalog--filter-open');
    unlockPageScroll();
    catalogBodyElement.removeEventListener('click', onCatalogBodyClick);
  };

  function onCatalogBodyClick(evt) {
    if (!evt.target.closest('.catalog__filter-wrapper')) {
      closeFilter();
    }
  }

  filterToggleButtonElement.addEventListener('click', () => {
    if (catalogElement.classList.contains('catalog--filter-open')) {
      closeFilter();
    } else {
      openFilter();
    }
  });

  filterCloseButtonElement.addEventListener('click', (evt) => {
    closeFilter();
  });

  window.addEventListener('resize', throttleAndDebounce(onWindowResize, 500));

  new SimpleBar(catalogElement.querySelector('.catalog-filter__sections'), { autoHide: false });

  laptopWidthMediaQueryList.addEventListener('change', () => {
    closeFilter();
  });

  clearButtonElement.addEventListener('click', () => {
    clearFilter();
  })
}

/* * * * * * * * * * * * * * * * * * * * * * * */
