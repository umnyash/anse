/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-info.js
 */
function initProductInfo(productInfoElement) {
  const closeOpenedItems = (targetFoldElement) => {
    productInfoElement.querySelectorAll('.product-info__item--open').forEach(openItemElement => {
      if (openItemElement !== targetFoldElement) {
        openItemElement.classList.remove('product-info__item--open');
        openItemElement.querySelector('.product-info__button').ariaExpanded = 'false';
      }
    });
  };

  const openFirstItem = () => {
    const firstItemElement = productInfoElement.querySelector('.product-info__item');
    const buttonElement = firstItemElement.querySelector('.product-info__button');

    firstItemElement.classList.add('product-info__item--open');
    buttonElement.ariaExpanded = 'true';
  };

  productInfoElement.addEventListener('click', ({ target }) => {
    const buttonElement = target.closest('.product-info__button');
    if (!buttonElement) {
      return;
    }

    const foldElement = buttonElement.closest('.product-info__item');

    if (laptopWidthMediaQueryList.matches) {
      closeOpenedItems(foldElement);
    }

    const contentWrapperElement = foldElement.querySelector('.product-info__content-wrapper');
    const contentElement = contentWrapperElement.querySelector('.product-info__content');

    const contentElementHeight = contentElement.getBoundingClientRect().height;
    contentWrapperElement.style.height = `${contentElementHeight}px`;

    contentElement.style.position = 'absolute';

    setTimeout(() => {
      foldElement.classList.toggle('product-info__item--open');
    }, 20);

    buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
  });

  productInfoElement.addEventListener('transitionend', ({ target }) => {
    const foldElement = target.closest('.product-info__item');

    if (!foldElement || !foldElement.classList.contains('product-info__item--open')) {
      return;
    }

    if (target.classList.contains('product-info__content')) {
      target.style.position = 'static';
    }

    if (target.classList.contains('product-info__content-wrapper')) {
      setTimeout(() => {
        target.style.height = 'auto';
      }, 0);
    }
  });

  laptopWidthMediaQueryList.addEventListener('change', () => {
    if (laptopWidthMediaQueryList.matches) {
      closeOpenedItems();
      openFirstItem();
    }
  });

  openFirstItem();

  // Custom scroll
  productInfoElement.querySelectorAll('.product-info__content-wrapper').forEach((wrapperElement) => {
    new SimpleBar(wrapperElement, { autoHide: false })
  });
};
/* * * * * * * * * * * * * * * * * * * * * * * */
