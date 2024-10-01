/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card-colors.js
 */
function initProductCardColors(listElement) {
  const calculateFittingItems = () => {
    for (const item of listElement.children) {
      const colorListElement = item.querySelector('.product-card__colors-list');

      if (!colorListElement) {
        continue;
      }

      colorListElement.className = 'product-card__colors-list';
      const counterElement = item.querySelector('.product-card__colors-counter');
      counterElement.classList.add('product-card__colors-counter--hidden');
      let listWidth = colorListElement.offsetWidth;
      const itemWidth = parseInt(getComputedStyle(colorListElement.querySelector('.product-card__colors-item')).width);
      const gap = parseInt(getComputedStyle(colorListElement).columnGap);
      let maxItems = Math.floor((listWidth + gap) / (itemWidth + gap));
      let quantityOverflowItems = colorListElement.children.length - maxItems;

      if (!quantityOverflowItems) {
        continue;
      }

      counterElement.textContent = `+${quantityOverflowItems}`;
      counterElement.classList.remove('product-card__colors-counter--hidden');
      listWidth = colorListElement.offsetWidth;
      maxItems = Math.floor((listWidth + gap) / (itemWidth + gap));
      colorListElement.classList.add(`product-card__colors-list--max_${maxItems}`);
      quantityOverflowItems = colorListElement.children.length - maxItems;
      counterElement.textContent = `+${quantityOverflowItems}`;
    }
  };

  calculateFittingItems();

  window.addEventListener('resize', debounce(calculateFittingItems, 500));
}

/* * * * * * * * * * * * * * * * * * * * * * * */
