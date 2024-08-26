/* * * * * * * * * * * * * * * * * * * * * * * *
 * taber.js
 */
class Taber {
  constructor(taberElement) {
    this.taberElement = taberElement;
    this.init();
  }

  switchTab = (oldTabElement, newTabElement, isInitialization) => {
    if (oldTabElement) {
      oldTabElement.ariaSelected = null;
      oldTabElement.tabIndex = -1;
      oldTabElement.classList.remove('taber__tab--active');
      const oldIndex = this.tabElements.indexOf(oldTabElement);
      this.panelElements[oldIndex].classList.add('taber__panel--hidden');
    }

    if (!isInitialization) {
      newTabElement.focus();
    }

    newTabElement.tabIndex = 0;
    newTabElement.ariaSelected = true;
    newTabElement.classList.add('taber__tab--active');
    const index = this.tabElements.indexOf(newTabElement);
    this.panelElements[index].classList.remove('taber__panel--hidden');
  };

  openStartTab = () => {
    const targetTabHash = window.location.hash;
    const targetTab = this.tabElements.find((tabElement) => tabElement.hash === targetTabHash);

    this.switchTab(null, targetTab || this.tabElements[0], true);
  };

  onTaberListClick = (evt) => {
    evt.preventDefault();
    const tabElement = evt.target.closest('.taber__tab');

    if (!tabElement) {
      return;
    }

    const currentTabElement = this.listElement.querySelector('[aria-selected]');

    if (tabElement === currentTabElement) {
      return;
    }

    this.switchTab(currentTabElement, tabElement);
  };

  onTaberListKeydown = (evt) => {
    const index = this.tabElements.indexOf(evt.target);

    if (!isDownArrowEvent(evt) && !isLeftArrowEvent(evt) && !isRightArrowEvent(evt)) {
      return;
    }

    evt.preventDefault();

    if (isDownArrowEvent(evt)) {
      this.panelElements[index].focus();
    } else {
      const newIndex = isLeftArrowEvent(evt) ? index - 1 : index + 1;

      if (!this.tabElements[newIndex]) {
        return;
      }

      this.switchTab(evt.target, this.tabElements[newIndex]);
    }
  };

  init() {
    this.id = this.taberElement.id;
    this.listElement = this.taberElement.querySelector('.taber__list');
    this.tabElements = Array.from(this.listElement.querySelectorAll('.taber__tab'));
    this.panelElements = this.taberElement.querySelectorAll('.taber__panel');

    this.listElement.setAttribute('role', 'tablist');

    this.tabElements.forEach((tabElement, index) => {
      tabElement.role = 'tab';
      tabElement.id = `${this.id}-tab-${index + 1}`;
      tabElement.href = `#${this.id}-panel-${index + 1}`;
      tabElement.tabIndex = -1;
      tabElement.parentNode.role = 'presentation';
    });

    this.panelElements.forEach((panelElement, index) => {
      panelElement.role = 'tabpanel';
      panelElement.id = `${this.id}-panel-${index + 1}`;
      panelElement.tabIndex = -1;
      panelElement.setAttribute('aria-labelledby', this.tabElements[index].id);
      panelElement.classList.add('taber__panel--hidden');
    });

    this.openStartTab();

    this.listElement.addEventListener('click', this.onTaberListClick);
    this.listElement.addEventListener('keydown', this.onTaberListKeydown);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
