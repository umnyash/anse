/* * * * * * * * * * * * * * * * * * * * * * * *
 * alert.js
 */
class Product {
  CART_NOTIFICATION_DURATION = 3000;

  constructor(productElement) {
    this.formElement = productElement.querySelector('.product__inner');
    this.cartNotificationElement = document.querySelector('.cart-notification');
    this.sizeCheckboxElements = Array.from(productElement.querySelectorAll('.size-buttons__control'));
    this.counterElement = productElement.querySelector('.product__cart-counter .counter__control');
    this.counterButtonMinusElement = productElement.querySelector('.product__cart-counter .counter__button--minus');

    this.sizeModalElement = document.querySelector('[data-modal="size"]');
    this.sizeModalFormElement = this.sizeModalElement.querySelector('.modal-size');
    this.sizeModalCheckboxElements = Array.from(this.sizeModalFormElement.querySelectorAll('.size-buttons__control'));
    this.sizeModalSubmitButtonElement = this.sizeModalFormElement.querySelector('.modal-size__button');
    this.sizeModal = null;

    this.form = null;
    this.init();
  }

  lockSizeModalSubmitButton = () => {
    this.sizeModalSubmitButtonElement.disabled = true;
    this.sizeModalSubmitButtonElement.classList.add('button--disabled');
  };

  unlockSizeModalSubmitButton = () => {
    this.sizeModalSubmitButtonElement.disabled = false;
    this.sizeModalSubmitButtonElement.classList.remove('button--disabled');
  };

  checkSelectedSizeInModalForm = () => {
    return this.sizeModalCheckboxElements.some((checkboxElement) => checkboxElement.checked);
  };

  setSizeModalSubmitButtonState = () => {
    const isSizeSelected = this.checkSelectedSizeInModalForm();

    if (isSizeSelected) {
      this.unlockSizeModalSubmitButton();
    } else {
      this.lockSizeModalSubmitButton();
    }
  };

  setCounterValue = (value) => {
    const minValue = +this.counterElement.min;
    this.counterElement.value = value;
    this.counterButtonMinusElement.disabled = +this.counterElement.value <= minValue;
  };

  onSizeModalFormChange = () => {
    this.setSizeModalSubmitButtonState();
  };

  checkSelectedSize = () => {
    return this.sizeCheckboxElements.some((checkboxElement) => checkboxElement.checked);
  };

  setAddedToCartView = () => {
    productElement.classList.add('product--in-cart');
  };

  setDefaultView = () => {
    productElement.classList.remove('product--in-cart');
  };

  showCartNotification = () => {
    this.cartNotificationElement.show();

    setTimeout(() => {
      this.cartNotificationElement.close();
    }, this.CART_NOTIFICATION_DURATION);
  };

  openSizeModal = () => {
    this.sizeModal.open();
  };

  closeSizeModal = () => {
    this.sizeModal.close();
  };

  init() {
    this.sizeModal = new Modal(this.sizeModalElement);
    this.sizeModalFormElement.addEventListener('change', this.onSizeModalFormChange);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
