/* * * * * * * * * * * * * * * * * * * * * * * *
 * product.js
 */
class Product {
  CART_NOTIFICATION_DURATION = 3000;

  constructor(productElement) {
    this.formElement = productElement.querySelector('.product__inner');
    this.cartNotificationElement = document.querySelector('.cart-notification');
    this.counterElement = productElement.querySelector('.product__cart-counter .counter__control');
    this.counterButtonMinusElement = productElement.querySelector('.product__cart-counter .counter__button--minus');
    this.colorSectionElement = productElement.querySelector('.product__color-section');
    this.sizeSectionElement = productElement.querySelector('.product__size-section');
    this.checkSelectedColor = () => true;
    this.checkSelectedSize = () => true;

    this.form = null;
    this.init();
  }

  initColorButtons = () => {
    const colorOutputElement = this.colorSectionElement.querySelector('.product__color-value');
    const colorListElement = this.colorSectionElement.querySelector('.product__colors');

    colorListElement.addEventListener('change', (evt) => {
      const colorElement = evt.target.closest('.color');
      const colorTitle = colorElement.querySelector('.color__title').textContent;
      colorOutputElement.textContent = colorTitle;
    });
  };

  initColors = () => {
    if (!this.colorSectionElement) {
      return;
    }

    this.colorModalElement = document.querySelector('[data-modal="color"]');
    this.colorButtonElements = Array.from(productElement.querySelectorAll('.color__control'));

    this.colorModalFormElement = this.colorModalElement.querySelector('.modal-color');
    this.colorModalButtonElements = Array.from(this.colorModalFormElement.querySelectorAll('.color__control'));
    this.colorModalSubmitButtonElement = this.colorModalFormElement.querySelector('.modal-color__button');
    this.colorModal = null;

    this.lockColorModalSubmitButton = () => {
      this.colorModalSubmitButtonElement.disabled = true;
      this.colorModalSubmitButtonElement.classList.add('button--disabled');
    };

    this.unlockColorModalSubmitButton = () => {
      this.colorModalSubmitButtonElement.disabled = false;
      this.colorModalSubmitButtonElement.classList.remove('button--disabled');
    };

    this.checkSelectedColorInModalForm = () => {
      return this.colorModalButtonElements.some((buttonElement) => buttonElement.checked);
    };

    this.setColorModalSubmitButtonState = () => {
      const isColorSelected = this.checkSelectedColorInModalForm();

      if (isColorSelected) {
        this.unlockColorModalSubmitButton();
      } else {
        this.lockColorModalSubmitButton();
      }
    };

    this.onColorModalFormChange = (evt) => {
      this.setColorModalSubmitButtonState();

      const associatedButtonElement = this.colorButtonElements.find((buttonElement) => buttonElement.value === evt.target.value);
      associatedButtonElement.checked = true;
    };

    this.checkSelectedColor = () => {
      return this.colorButtonElements.some((buttonElement) => buttonElement.checked);
    };

    this.openColorModal = () => {
      this.colorModal.open();
    };

    this.closeColorModal = () => {
      this.colorModal.close();
    };

    this.colorModal = new Modal(this.colorModalElement);
    this.colorModalFormElement.addEventListener('change', this.onColorModalFormChange);

    this.initColorButtons();
  };

  initSizes = () => {
    if (!this.sizeSectionElement) {
      return;
    }

    this.sizeModalElement = document.querySelector('[data-modal="size"]');
    this.sizeCheckboxElements = Array.from(productElement.querySelectorAll('.size-buttons__control'));

    this.sizeModalFormElement = this.sizeModalElement.querySelector('.modal-size');
    this.sizeModalCheckboxElements = Array.from(this.sizeModalFormElement.querySelectorAll('.size-buttons__control'));
    this.sizeModalSubmitButtonElement = this.sizeModalFormElement.querySelector('.modal-size__button');
    this.sizeModal = null;

    this.lockSizeModalSubmitButton = () => {
      this.sizeModalSubmitButtonElement.disabled = true;
      this.sizeModalSubmitButtonElement.classList.add('button--disabled');
    };

    this.unlockSizeModalSubmitButton = () => {
      this.sizeModalSubmitButtonElement.disabled = false;
      this.sizeModalSubmitButtonElement.classList.remove('button--disabled');
    };

    this.checkSelectedSizeInModalForm = () => {
      return this.sizeModalCheckboxElements.some((checkboxElement) => checkboxElement.checked);
    };

    this.setSizeModalSubmitButtonState = () => {
      const isSizeSelected = this.checkSelectedSizeInModalForm();

      if (isSizeSelected) {
        this.unlockSizeModalSubmitButton();
      } else {
        this.lockSizeModalSubmitButton();
      }
    };

    this.onSizeModalFormChange = (evt) => {
      this.setSizeModalSubmitButtonState();

      const associatedCheckboxElement = this.sizeCheckboxElements.find((checkboxElement) => checkboxElement.value === evt.target.value);
      associatedCheckboxElement.checked = true;
    };

    this.checkSelectedSize = () => {
      return this.sizeCheckboxElements.some((checkboxElement) => checkboxElement.checked);
    };

    this.openSizeModal = () => {
      this.sizeModal.open();
    };

    this.closeSizeModal = () => {
      this.sizeModal.close();
    };

    this.sizeModal = new Modal(this.sizeModalElement);
    this.sizeModalFormElement.addEventListener('change', this.onSizeModalFormChange);
  }

  setCounterValue = (value) => {
    const minValue = +this.counterElement.min;
    this.counterElement.value = value;
    this.counterButtonMinusElement.disabled = +this.counterElement.value <= minValue;
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

  init() {
    this.initColors();
    this.initSizes();

    this.formElement.addEventListener('change', (evt) => {
      const colorControlElement = evt.target.classList.contains('color__control');
      const sizeContolElement = evt.target.classList.contains('size-buttons__control');

      if (colorControlElement || sizeContolElement) {
        this.setDefaultView();
        this.setCounterValue(1);
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
