/* * * * * * * * * * * * * * * * * * * * * * * *
 * page-scrollbar.js
 */
function initPageScrollbar(pageInnerElement) {
  return new SimpleBar(pageInnerElement, {
    classNames: {
      contentEl: 'page__inner',
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
