/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */
const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);
const inputEvent = new Event('input', { bubbles: true });
const changeEvent = new Event('change', { bubbles: true });
const simpleBar = initPageScrollbar(document.querySelector('.page__scroll-wrapper'));

initSiteHeader(document.querySelector('.site-header'), simpleBar.getScrollElement());
initSiteNavigation(document.querySelector('.site-navigation'));
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
document.querySelectorAll('.taber').forEach((taberElement) => new Taber(taberElement));
document.querySelectorAll('.size-chart').forEach(initSizeChart);
document.querySelectorAll('.video').forEach((videoElement) => new Video(videoElement));
document.querySelectorAll('.shop__slider-wrapper').forEach(initShopSlider);
document.querySelectorAll('.simple-filter__slider-wrapper').forEach(initSimpleFilterSlider);
document.querySelectorAll('.review__slider-wrapper').forEach(initReviewSlider);
document.querySelectorAll('.brands').forEach(initBrandsSlider);
document.querySelectorAll('.catalog-preview .products-slider').forEach(initCatalogPreviewSlider);
document.querySelectorAll('.search, .site-header__search').forEach(initSearch);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.products').forEach(initProducts);
document.querySelectorAll('.product').forEach(initProduct);

let reviews = null;
let reviewsElement = document.querySelector('.reviews');
if (reviewsElement) {
  reviews = new Reviews(reviewsElement);
}

initReviewsIntroPhotos()
initConsumersPhotos();
/* * * * * * * * * * * * * * * * * * * * * * * */
