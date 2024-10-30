/* * * * * * * * * * * * * * * * * * * * * * * *
 *  checkout-form.js
 */

class CheckoutForm extends Form {
  deliveryCompanyStateClasses = {
    sdek: 'checkout-form--delivery-company_sdek',
    post: 'checkout-form--delivery-company_post',
    selfPickup: 'checkout-form--delivery-company_self-pickup'
  };

  deliveryMethodStateClasses = {
    point: 'checkout-form--delivery-method_point',
    courier: 'checkout-form--delivery-method_courier',
  };

  constructor(formElement) {
    super(formElement);

    this.formElement = formElement;
    this.regionFieldElement = this.formElement.querySelector('[data-name="region"]');
    this.deliveryCompanyButtonsWrapper = this.formElement.querySelector('.checkout-form__delivery-company');
    this.phoneFieldElement = this.formElement.querySelector('.checkout-form__phone-field .text-field__control');
    this.pickupPointFieldWrapperElement = this.formElement.querySelector('.checkout-form__pick-up-point-field');
    this.deliveryAddressFieldElement = this.formElement.querySelector('[data-name="delivery-address"]');

    this.regionModalElement = document.querySelector('[data-modal="region-form"]');
    this.regionFormElement = this.regionModalElement.querySelector('.modal-form');
    this.regionFormCountryFieldElement = this.regionFormElement.querySelector('.modal-form__country-select select');
    this.regionFormCountrySelect = initSelect(this.regionFormCountryFieldElement);
    this.regionFormCountryOptionElements = Array.from(this.regionFormElement.querySelectorAll('.modal-form__country-select option'));
    this.regionFormCityFieldElement = this.regionFormElement.querySelector('.modal-form__city-field .text-field__control');
    this.regionFormSubmitButtonElement = this.regionFormElement.querySelector('.modal-form__submit-button');
    this.regionModal = new Modal(this.regionModalElement);

    this.addressModalElement = document.querySelector('[data-modal="address-form"]');
    this.addressFormElement = this.addressModalElement.querySelector('.modal-form');
    this.addressModal = new Modal(this.addressModalElement);
    this.addressFormValidator = new FormValidator(this.addressFormElement);
    this.addressFormSubmitButtonElement = this.addressFormElement.querySelector('.modal-form__submit-button');
    this.addressFieldControlElements = Array.from(this.addressFormElement.querySelectorAll(
      `
        .modal-form__postal-code-field .text-field__control,
        .modal-form__street-house-field .text-field__control,
        .modal-form__entrance-field .text-field__control,
        .modal-form__apartment-office-field .text-field__control
      `
    ));

    this.addressFormSubmitButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      const isValid = this.addressFormValidator.validate();

      if (isValid) {
        const address = this.addressFieldControlElements
          .filter((controlElement) => controlElement.value.trim())
          .map((controlElement) => {
            const controlWrapperElement = controlElement.closest('.text-field');
            let label = '';

            switch (true) {
              case controlWrapperElement.matches('.modal-form__street-house-field'):
                label = 'улица';
                break;
              case controlWrapperElement.matches('.modal-form__entrance-field'):
                label = 'подъезд';
                break;
              case controlWrapperElement.matches('.modal-form__apartment-office-field'):
                label = 'кв/офис';
                break;
            }

            return `${label} ${controlElement.value}`;
          })
          .join(', ');
        this.deliveryAddressFieldElement.value = address;
        this.deliveryAddressFieldElement.dispatchEvent(inputEvent);
        this.addressModal.close();
      } else {
        const firstInvalidItemElement = this.addressFormElement.querySelector('.pristine-item--invalid');
        firstInvalidItemElement.querySelector('input').focus();
        firstInvalidItemElement.classList.remove('shake');
        requestAnimationFrame(() => firstInvalidItemElement.classList.add('shake'));
      }
    })

    this.addressFormCountryFieldElement = this.addressFormElement.querySelector('.modal-form__country-select select');
    if (this.addressFormCountryFieldElement) {
      this.addressFormCountrySelect = initSelect(this.addressFormCountryFieldElement);
      this.addressFormCountryOptionElements = Array.from(this.addressFormElement.querySelectorAll('.modal-form__country-select option'));
    }


    if (this.addressFormCityFieldElement) {
      this.addressFormCityFieldElement = this.addressFormElement.querySelector('.modal-form__city-field .text-field__control');
    }

    this.sdekModalElement = document.querySelector('[data-modal="sdek-sdek"]');
    this.sdekModal = new Modal(this.sdekModalElement);
    this.sdekModal.initOpener(this.pickupPointFieldWrapperElement);

    this.postModalElement = document.querySelector('[data-modal="sdek-post"]');
    this.postModal = new Modal(this.postModalElement);
    this.postModal.initOpener(this.pickupPointFieldWrapperElement);

    this.init();
  }

  getSelectedOption = (selectElement, optionElements) =>
    optionElements.find((optionElement) => optionElement.value === selectElement.value);

  setDeliveryCompanySdekState = () => {
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.post);
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.selfPickup);
    this.formElement.classList.add(this.deliveryCompanyStateClasses.sdek);
  };

  setDeliveryCompanyPostState = () => {
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.sdek);
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.selfPickup);
    this.formElement.classList.add(this.deliveryCompanyStateClasses.post);
  };

  setDeliveryCompanySelfPickupState = () => {
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.sdek);
    this.formElement.classList.remove(this.deliveryCompanyStateClasses.post);
    this.formElement.classList.add(this.deliveryCompanyStateClasses.selfPickup);
  };

  setDeliveryMethodCourierState = () => {
    this.formElement.classList.remove(this.deliveryMethodStateClasses.point);
    this.formElement.classList.add(this.deliveryMethodStateClasses.courier);
  };

  setDeliveryMethodPointState = () => {
    this.formElement.classList.add(this.deliveryMethodStateClasses.point);
    this.formElement.classList.remove(this.deliveryMethodStateClasses.courier);
  };

  onFormChange = (evt) => {
    const deliveryCompanyButtonElement = evt.target.closest('.checkout-form__delivery-company');
    const deliveryMethodButtonElement = evt.target.closest('.checkout-form__delivery-methods');

    if (deliveryCompanyButtonElement) {
      const buttonTitle = evt.target.dataset.title;

      switch (buttonTitle) {
        case 'SDEK':
          this.setDeliveryCompanySdekState();
          this.pickupPointFieldWrapperElement.dataset.modalOpener = 'sdek-sdek';
          break;
        case 'POST':
          this.setDeliveryCompanyPostState();
          this.pickupPointFieldWrapperElement.dataset.modalOpener = 'sdek-post';
          break;
        case 'PICKUP':
          this.setDeliveryCompanySelfPickupState();
          break;
      }

      return;
    }

    if (deliveryMethodButtonElement) {
      const buttonType = evt.target.dataset.type;

      switch (buttonType) {
        case 'courier':
          this.setDeliveryMethodCourierState();
          break;
        case 'point':
          this.setDeliveryMethodPointState();
          break;
      }

      return;
    }
  };

  init = () => {
    new IMask(this.phoneFieldElement, {
      mask: '[+]00000000000000000',
    });

    this.formElement.addEventListener('change', this.onFormChange);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
