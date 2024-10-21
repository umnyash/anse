/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */
const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);
const inputEvent = new Event('input', { bubbles: true });
const changeEvent = new Event('change', { bubbles: true });
const simpleBar = initPageScrollbar(document.querySelector('.page__scroll-wrapper'));

initSkeletons();

initSiteHeader(document.querySelector('.site-header'), simpleBar.getScrollElement());
initSiteNavigation(document.querySelector('.site-navigation'));
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
document.querySelectorAll('.taber').forEach((taberElement) => new Taber(taberElement));
document.querySelectorAll('.size-chart').forEach(initSizeChart);
document.querySelectorAll('.video').forEach((videoElement) => new Video(videoElement));
document.querySelectorAll('.shop__slider-wrapper').forEach(initShopSlider);
document.querySelectorAll('.simple-filter__slider-wrapper').forEach(initSimpleFilterSlider);
document.querySelectorAll('.brands').forEach(initBrandsSlider);
document.querySelectorAll('.catalog-preview .products-slider').forEach(initCatalogPreviewSlider);
document.querySelectorAll('.search, .site-header__search').forEach(initSearch);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.products').forEach(initProducts);
document.querySelectorAll('.product').forEach(initProduct);
document.querySelectorAll('[data-modal="offer"]').forEach((modalElement) => new Modal(modalElement));
document.querySelectorAll('[data-modal="size-chart"]').forEach((modalElement) => new Modal(modalElement));
document.querySelectorAll('[data-modal="manager-contacts"]').forEach((modalElement) => new Modal(modalElement));
document.querySelectorAll('.set').forEach(initSet);
document.querySelectorAll('.cart__form, .product__cart').forEach(initProductsCounters);
document.querySelectorAll('.products-list__items, .products-slider__list').forEach(initProductCardColors);

document.querySelectorAll('.birth-date-modal-form .select__control').forEach(initSelect);

document.querySelectorAll('.checkout-order__products').forEach(initCheckoutProductsSlider);

let subscriptionForm = null;
let subscriptionFormElement = document.querySelector('.subscription-form');
if (subscriptionFormElement) {
  subscriptionForm = new Form(subscriptionFormElement);
}

let reviews = null;
let reviewsElement = document.querySelector('.reviews');
if (reviewsElement) {
  reviews = new Reviews(reviewsElement);
}

let catalog = null;
const catalogElement = document.querySelector('.catalog');
if (catalogElement) {
  catalog = new Catalog(catalogElement, simpleBar.getScrollElement());
}

let celebrities = null;
const celebritiesElement = document.querySelector('.celebrities');
if (celebritiesElement) {
  celebrities = new Celebrities(celebritiesElement);
}

let product = null;
let productElement = document.querySelector('.product');
if (productElement) {
  product = new Product(productElement);
}

let modalEntry = null;
const modalEntryElement = document.querySelector('[data-modal="entry"]');
if (modalEntryElement) {
  modalEntry = new ModalEntry(modalEntryElement);
}

let checkoutForm = null;
const checkoutFormElement = document.querySelector('.checkout-form');
if (checkoutFormElement) {
  checkoutForm = new CheckoutForm(checkoutFormElement);
}

let profileForm = null;
const profileFormElement = document.querySelector('.profile-form');
if (profileFormElement) {
  profileForm = new ProfileForm(profileFormElement, { resetAfterSubmit: false });
}

let birthDateInfoModal = null;
const birthDateInfoModalElement = document.querySelector('[data-modal="birth-date-info"]');
if (birthDateInfoModalElement) {
  birthDateInfoModal = new Modal(birthDateInfoModalElement);
}

let birthDateModalForm = null;
const birthDateModalFormElement = document.querySelector('[data-modal="birth-date"]');
if (birthDateModalFormElement && birthDateInfoModal) {
  birthDateModalForm = new BirthDateModalForm(birthDateModalFormElement, birthDateInfoModal);
}

initReviewsIntroPhotos()
initConsumersPhotos();
/* * * * * * * * * * * * * * * * * * * * * * * */
