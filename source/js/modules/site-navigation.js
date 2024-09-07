/* * * * * * * * * * * * * * * * * * * * * * * *
 * site-navigation-scrollbar.js
 */
function initSiteNavigation(navigationElement) {
  navigationElement.addEventListener('click', (evt) => {
    if (laptopWidthMediaQueryList.matches) {
      return;
    }

    const openerElement = evt.target.closest('.site-navigation__link--opener');

    if (!openerElement) {
      return;
    }

    evt.preventDefault();
    openerElement.classList.toggle('site-navigation__link--active');
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
