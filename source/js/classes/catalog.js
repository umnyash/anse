/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog.js
 */
class Catalog {
  constructor(catalogElement, pageScrollWrapperElement) {
    this.catalogElement = catalogElement;
    this.pageScrollWrapperElement = pageScrollWrapperElement;
    this.productsWrapperElement = catalogElement.querySelector('.products-list__items');
    this.sortingElement = catalogElement.querySelector('.catalog__sorting');

    this.init();
  }

  createProductListItemElement = (product) => {
    const badgesString = (product.new || product.sale) ? `
      <div class="product-badges product-card__badges product-badges--light">
        <ul class="product-badges__list">
          ${product.sale ? '<li class="product-badges__item">sale</li>' : ''}
          ${product.new ? '<li class="product-badges__item">new</li>' : ''}
        </ul>
      </div>
    ` : '';

    const sizesString = product.sizes ? `
      <ol class="product-card__sizes">
        ${product.sizes.map((size) => `
          <li class="product-card__sizes-item ${!size.disabled ? 'product-card__sizes-item--active' : ''}">
            ${size.title}
          </li>
        `).join('')}
      </ol>
    ` : '';

    const colorsString = product.colors ? `
      <div class="product-card__colors">
        <ul class="product-card__colors-list">
          ${product.colors.map((color) => `
            <li class="product-card__colors-item ${color.disabled ? 'product-card__colors-item--disabled' : ''}">
              <img class="product-card__colors-image" src="${color.src}" width="28" height="28" alt="${color.title}">
            </li>
          `).join('')}
        </ul>
        <p class="product-card__colors-counter product-card__colors-counter--hidden"></p>
      </div>
    ` : '';

    const productListItemString = `
      <li class="products-list__item">
        <article class="product-card">
          <div class="product-card__link-wrapper">
            <h2 class="product-card__heading">
              <a class="product-card__link" href="${product.link}">${product.title}</a>
            </h2>
            <div class="product-card__images">
              <picture class="product-card__image-wrapper-primary media media--cover media--position_top skeleton">
                <img class="product-card__image media__image" src="${product.image}" width="365" height="563" alt="" loading="lazy">
              </picture>
              <picture class="product-card__image-wrapper-secondary media media--cover media--position_top skeleton">
                <img class="product-card__image media__image" src="${product.image2}" width="365" height="563" alt="" loading="lazy">
              </picture>
              ${badgesString}
              ${colorsString}
              ${sizesString}
            </div>
          </div>
          <div class="product-card__price-wrapper">
            ${product.oldPrice ? `<s class="product-card__price product-card__price--old">${product.oldPrice.toLocaleString('ru-RU')} ₽</s>` : ''}
            ${product.price ? `<p class="product-card__price">${product.price.toLocaleString('ru-RU')} ₽</p>` : ''}
          </div>
          ${product.installments ? `<p class="product-card__installments">Долями по ${product.installments.toLocaleString('ru-RU')} ₽</p>` : ''}
        </article>
      </li>
    `;

    return createElementByString(productListItemString);
  };

  renderProducts = (products) => {
    const productListItemElements = products.map(this.createProductListItemElement);
    this.productsWrapperElement.append(...productListItemElements);

    for (const itemElement of productListItemElements) {
      initSkeletons(itemElement);
      setProductCardColorsCounter(itemElement);
    }
  };

  init = () => {
    initCatalogFilter(this.catalogElement, this.pageScrollWrapperElement);
    initCatalogSorting(this.sortingElement);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
