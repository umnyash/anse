/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-card-colors.js
 */
function setProductCardColorsCounter(itemElement) {
  const colorListElement = itemElement.querySelector('.product-card__colors-list');

  if (!colorListElement) {
    return;
  }

  colorListElement.className = 'product-card__colors-list';
  const counterElement = itemElement.querySelector('.product-card__colors-counter');
  counterElement.classList.add('product-card__colors-counter--hidden');
  let listWidth = colorListElement.offsetWidth;
  const itemWidth = parseInt(getComputedStyle(colorListElement.querySelector('.product-card__colors-item')).width);
  const gap = parseInt(getComputedStyle(colorListElement).columnGap);
  let maxItems = Math.floor((listWidth + gap) / (itemWidth + gap));
  let quantityOverflowItems = colorListElement.children.length - maxItems;

  if (!quantityOverflowItems) {
    return;
  }

  counterElement.textContent = `+${quantityOverflowItems}`;
  counterElement.classList.remove('product-card__colors-counter--hidden');
  listWidth = colorListElement.offsetWidth;
  maxItems = Math.floor((listWidth + gap) / (itemWidth + gap));
  colorListElement.classList.add(`product-card__colors-list--max_${maxItems}`);
  quantityOverflowItems = colorListElement.children.length - maxItems;
  counterElement.textContent = `+${quantityOverflowItems}`;
};

function setProductsListColorsCounter(listElement) {
  for (const item of listElement.children) {
    setProductCardColorsCounter(item);
  }
};

function initProductCardColors(listElement) {
  setProductsListColorsCounter(listElement);
  window.addEventListener('resize', debounce(() => setProductsListColorsCounter(listElement), 500));
}
/* * * * * * * * * * * * * * * * * * * * * * * */
