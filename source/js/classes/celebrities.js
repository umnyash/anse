/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews.js
 */
class Celebrities {
  constructor(celebritiesElement) {
    this.celebritiesElement = celebritiesElement;
    this.celebritiesWrapperElement = this.celebritiesElement.querySelector('.celebrities-list__items');
  }

  createCelebritiesListItemElement = (celebrity) => {
    const celebrityString = `
      <li class="celebrities-list__item">
        <picture class="celebrities-list__image-wrapper skeleton">
          <img class="celebrities-list__image" src=${celebrity.image} width="750" height="1030" alt=${celebrity.title} loading="lazy">
        </picture>
        <p class="celebrities-list__title">${celebrity.title}</p>
      </li>
    `;

    return createElementByString(celebrityString);
  }

  renderCelebrities = (celebrities) => {
    const celebritiesElements = celebrities.map(this.createCelebritiesListItemElement);
    this.celebritiesWrapperElement.append(...celebritiesElements);

    for (const celebritiesElement of celebritiesElements) {
      initSkeletons(celebritiesElement);
    }
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
