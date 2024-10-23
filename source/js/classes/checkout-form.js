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
    this.addressFormCountryFieldElement = this.addressFormElement.querySelector('.modal-form__country-select select');
    this.addressFormCountrySelect = initSelect(this.addressFormCountryFieldElement);
    this.addressFormCountryOptionElements = Array.from(this.addressFormElement.querySelectorAll('.modal-form__country-select option'));
    this.addressFormCityFieldElement = this.addressFormElement.querySelector('.modal-form__city-field .text-field__control');
    this.addressModal = new Modal(this.addressModalElement);

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

  onRegionFormSubmitButtonClick = () => {
    const countryText = this.getSelectedOption(this.regionFormCountryFieldElement, this.regionFormCountryOptionElements).textContent;
    const cityText = this.regionFormCityFieldElement.value;

    const regionText = `${countryText}, ${cityText}`;

    this.regionFieldElement.value = regionText;
    this.deliveryCompanyButtonsWrapper.classList.remove('checkout-form__delivery-company--hidden');
    this.regionModal.close();
  };

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
        case 'sdek':
          this.setDeliveryCompanySdekState();
          this.pickupPointFieldWrapperElement.dataset.modalOpener = 'sdek-sdek';
          break;
        case 'post':
          this.setDeliveryCompanyPostState();
          this.pickupPointFieldWrapperElement.dataset.modalOpener = 'sdek-post';
          break;
        case 'self-pickup':
          this.setDeliveryCompanySelfPickupState();
          break;
      }

      return;
    }

    if (deliveryMethodButtonElement) {
      const buttonTitle = evt.target.dataset.title;

      switch (buttonTitle) {
        case 'courier':
          this.setDeliveryMethodCourierState();
          break;
        case 'pick-up-point':
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

    this.regionFormSubmitButtonElement.addEventListener('click', this.onRegionFormSubmitButtonClick);
    this.formElement.addEventListener('change', this.onFormChange);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
