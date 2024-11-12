/* * * * * * * * * * * * * * * * * * * * * * * *
 * site-header.js
 */
function initSiteHeader(headerElement, pageScrollWrapperElement) {
  // Скрытие/отобржение шапки при прокрутке.
  let pageScrollY = 0;

  const onPageScroll = () => {
    const headerHeight = headerElement.offsetHeight;

    if (pageScrollWrapperElement.scrollTop > 0) {
      headerElement.classList.add('site-header--sticked');
    }

    if (pageScrollWrapperElement.scrollTop > pageScrollY && pageScrollWrapperElement.scrollTop > headerHeight) {
      headerElement.classList.add('site-header--hidden');
    } else {
      headerElement.classList.remove('site-header--hidden');

      if (pageScrollWrapperElement.scrollTop === 0) {
        headerElement.classList.remove('site-header--sticked');
      }
    }
    pageScrollY = pageScrollWrapperElement.scrollTop;
  };

  onPageScroll();
  pageScrollWrapperElement.addEventListener('scroll', throttleAndDebounce(onPageScroll, 50));

  // Бургер-меню
  const burgerElement = headerElement.querySelector('.site-header__burger');

  const openBurgerMenu = () => {
    headerElement.classList.add('site-header--menu-open');
    burgerElement.ariaExpanded = true;
    lockPageScroll();
  };

  const closeBurgerMenu = () => {
    headerElement.classList.remove('site-header--menu-open');
    burgerElement.ariaExpanded = false;
    unlockPageScroll();
  };

  burgerElement.addEventListener('click', () => {
    const isExpanded = burgerElement.ariaExpanded === 'true';

    if (isExpanded) {
      closeBurgerMenu();
    } else {
      openBurgerMenu();
    }
  });

  // Поиск
  const searchOpenerElements = headerElement.querySelectorAll('.site-header__search-button');
  const searchCloserElements = headerElement.querySelectorAll('[class^="site-header__search-close-button"]');
  const searchFieldElement = headerElement.querySelector('.search-form__field-control');

  const openSearchPanel = () => {
    headerElement.classList.add('site-header--search-open');
    lockPageScroll();
    searchFieldElement.focus();
  };

  const closeSearchPanel = () => {
    headerElement.classList.remove('site-header--search-open');
    unlockPageScroll();
  };

  searchOpenerElements.forEach((openerElement) => {
    openerElement.addEventListener('click', openSearchPanel);
  });

  searchCloserElements.forEach((closerElement) => {
    closerElement.addEventListener('click', closeSearchPanel);
  });

  const calcHeaderHeight = () => {
    document.body.style.setProperty('--site-header-height', `${headerElement.offsetHeight}px`);
  };

  // Изменение цвета шапки при открытии меню на декстопной версии (нужно для главной страницы, где шапка transparent)
  const siteNavigationLinkOpenerElements = headerElement.querySelectorAll('.site-navigation__link--opener');
  siteNavigationLinkOpenerElements.forEach((openerElement) => {
    openerElement.parentElement.addEventListener('mouseover', () => {
      if (laptopWidthMediaQueryList.matches) {
        headerElement.classList.add('site-header--menu-open');
      }
    });
  })
  siteNavigationLinkOpenerElements.forEach((openerElement) => {
    openerElement.parentElement.addEventListener('mouseout', () => {
      if (laptopWidthMediaQueryList.matches) {
        headerElement.classList.remove('site-header--menu-open');
      }
    });
  });

  // Уточнение высоты шапки

  document.addEventListener('DOMContentLoaded', () => {
    calcHeaderHeight();
  });

  window.addEventListener('load', () => {
    calcHeaderHeight();
  });

  window.addEventListener('resize', debounce(calcHeaderHeight, 500));

  // Закрытие меню и панели поиска при ресайзе

  laptopWidthMediaQueryList.addEventListener('change', () => {
    closeBurgerMenu();
    closeSearchPanel();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
