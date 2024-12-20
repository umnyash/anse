/* * * * * * * * * * * * * * * * * * * * * * * *
 * form-validator.js
 */
class FormValidator {
  constructor(formElement) {
    this.formElement = formElement;
    this.deliveryCompanyElement = this.formElement.querySelector('.checkout-form__delivery-company');
    this.deliveryMethodElement = this.formElement.querySelector('.checkout-form__delivery-method');
    this.pickUpPointFieldElement = this.formElement.querySelector('.checkout-form__pick-up-point-field .text-field__control');
    this.deliveryAddressFieldElement = this.formElement.querySelector('.checkout-form__delivery-address-field .text-field__control');
    this.addCustomErrorMessages();
    this.init();
  }

  addCustomErrorMessages = () => {
    const nameFieldElement = this.formElement.querySelector('[data-name="name"]');
    const surnameFieldElement = this.formElement.querySelector('[data-name="surname"]');
    const addressFieldElement = this.formElement.querySelector('[data-name="address"]');
    const phoneFieldElement = this.formElement.querySelector('[data-name="phone"]');
    const emailFieldElement = this.formElement.querySelector('[data-name="email"]');
    const messageFieldElement = this.formElement.querySelector('[data-name="message"]');
    const regionFieldElement = this.formElement.querySelector('[data-name="region"]');

    const postalCodeFieldElement = this.formElement.querySelector('.modal-form__postal-code-field .text-field__control');
    const streetHouseFieldElement = this.formElement.querySelector('.modal-form__street-house-field .text-field__control');
    const entranceFieldElement = this.formElement.querySelector('.modal-form__entrance-field .text-field__control');
    const apartmentOfficeFieldElement = this.formElement.querySelector('.modal-form__apartment-office-field .text-field__control');

    if (postalCodeFieldElement) {
      postalCodeFieldElement.closest('.text-field').classList.add('pristine-item');
      postalCodeFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (streetHouseFieldElement) {
      streetHouseFieldElement.closest('.text-field').classList.add('pristine-item');
      streetHouseFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (entranceFieldElement) {
      entranceFieldElement.closest('.text-field').classList.add('pristine-item');
      entranceFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (apartmentOfficeFieldElement) {
      apartmentOfficeFieldElement.closest('.text-field').classList.add('pristine-item');
      apartmentOfficeFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    const subscriptionFieldElement = this.formElement.querySelector('.subscription-form__field-control');

    if (subscriptionFieldElement) {
      subscriptionFieldElement.closest('.subscription-form__field').classList.add('pristine-item');
      subscriptionFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле';
      subscriptionFieldElement.dataset.pristineEmailMessage = 'Email введен неправильно';
    }

    if (nameFieldElement) {
      nameFieldElement.closest('.text-field').classList.add('pristine-item');
      nameFieldElement.dataset.pristinePattern = '/^[a-zа-яЁё -]+$/i';
      nameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
      nameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
    }

    if (surnameFieldElement) {
      surnameFieldElement.closest('.text-field').classList.add('pristine-item');
      surnameFieldElement.dataset.pristinePattern = '/^[a-zа-яЁё -]+$/i';
      surnameFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
      surnameFieldElement.dataset.pristinePatternMessage = 'Допустимы только буквы, дефисы и пробелы.';
    }

    if (this.pickUpPointFieldElement) {
      this.pickUpPointFieldElement.closest('.text-field').classList.add('pristine-item');
    }

    if (this.deliveryAddressFieldElement) {
      this.deliveryAddressFieldElement.closest('.text-field').classList.add('pristine-item');
    }

    if (addressFieldElement) {
      addressFieldElement.closest('.text-field').classList.add('pristine-item');
      addressFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (phoneFieldElement) {
      phoneFieldElement.closest('.text-field').classList.add('pristine-item');
      phoneFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (emailFieldElement) {
      emailFieldElement.closest('.text-field').classList.add('pristine-item');
      emailFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
      emailFieldElement.dataset.pristineEmailMessage = 'Введите корректный e-mail адрес.';
    }

    if (messageFieldElement) {
      messageFieldElement.closest('.text-area').classList.add('pristine-item');
      messageFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }

    if (regionFieldElement) {
      regionFieldElement.closest('.text-field').classList.add('pristine-item');
      regionFieldElement.dataset.pristineRequiredMessage = 'Заполните это поле.';
    }
  }

  resetRadiobuttonsGroupValidation(wrapperElement) {
    wrapperElement.querySelector('.pristine-item__error-text')?.remove();
    wrapperElement.classList.remove('pristine-item--invalid');
    wrapperElement.classList.remove('shake');
  }

  validateRadiobuttonsGroup(wrapperElement) {
    const isDeiveryMethodButtons = wrapperElement.classList.contains('checkout-form__delivery-method');
    const deliveryCompanyValue = this.deliveryCompanyElement.querySelector('.radio-button__control:checked')?.value;

    if (isDeiveryMethodButtons && deliveryCompanyValue === 'PICKUP') {
      return true;
    }

    const radiobuttonElements = Array.from(wrapperElement.querySelectorAll('.radio-button__control, .delivery-methods__control'));

    if (!radiobuttonElements.length) {
      return true;
    }

    const isChecked = radiobuttonElements.some((buttonElement) => buttonElement.checked);

    if (isChecked) {
      this.resetRadiobuttonsGroupValidation(wrapperElement);
    } else {
      wrapperElement.querySelector('.pristine-item__error-text')?.remove();
      wrapperElement.classList.add('pristine-item--invalid');
      wrapperElement.insertAdjacentHTML('beforeend', '<p class="pristine-item__error-text">Выберите один из вариантов.</p>')
    }

    return isChecked;
  };

  validate = () => {
    if (this.formElement.classList.contains('checkout-form')) {
      const isCompanyChecked = this.validateRadiobuttonsGroup(this.deliveryCompanyElement);
      const isMethodChecked = this.validateRadiobuttonsGroup(this.deliveryMethodElement);

      return this.pristine.validate() && isCompanyChecked && isMethodChecked;
    } else {
      return this.pristine.validate();
    }
  };

  reset = () => {
    this.pristine.reset();
    this.formElement.querySelectorAll('.shake').forEach((element) => element.classList.remove('shake'));

    if (this.formElement.classList.contains('checkout-form')) {
      this.resetRadiobuttonsGroupValidation(this.deliveryCompanyElement);
      this.resetRadiobuttonsGroupValidation(this.deliveryMethodElement);
    }
  };

  onCheckoutFormChange = (evt) => {
    if (evt.target.closest('.checkout-form__delivery-company')) {
      this.resetRadiobuttonsGroupValidation(this.deliveryCompanyElement);

      if (evt.target.value === 'PICKUP') {
        this.resetRadiobuttonsGroupValidation(this.deliveryMethodElement);
      }

    } else if (evt.target.closest('.checkout-form__delivery-method')) {
      this.resetRadiobuttonsGroupValidation(this.deliveryMethodElement);
    }
  };

  init = () => {
    this.pristine = new Pristine(this.formElement, {
      classTo: 'pristine-item',
      errorClass: 'pristine-item--invalid',
      errorTextParent: 'pristine-item',
      errorTextTag: 'p',
      errorTextClass: 'pristine-item__error-text',
    });

    if (this.pickUpPointFieldElement) {
      this.pristine.addValidator(
        this.pickUpPointFieldElement,
        () => {
          const hasRequiredClasses = (
            (this.formElement.classList.contains('checkout-form--delivery-company_post') || this.formElement.classList.contains('checkout-form--delivery-company_sdek')) &&
            this.formElement.classList.contains('checkout-form--delivery-method_point')
          );

          if (hasRequiredClasses) {
            return this.pickUpPointFieldElement.value.trim() !== '';
          }

          return true;
        },
        'Заполните это поле.'
      );
    }

    if (this.deliveryAddressFieldElement) {
      this.pristine.addValidator(
        this.deliveryAddressFieldElement,
        () => {
          const hasRequiredClasses = (
            (this.formElement.classList.contains('checkout-form--delivery-company_post') || this.formElement.classList.contains('checkout-form--delivery-company_sdek')) &&
            this.formElement.classList.contains('checkout-form--delivery-method_courier')
          );

          if (hasRequiredClasses) {
            return this.deliveryAddressFieldElement.value.trim() !== '';
          }

          return true;
        },
        'Заполните это поле.'
      );
    }

    if (!this.formElement.classList.contains('checkout-form')) {
      return;
    }

    this.formElement.addEventListener('change', this.onCheckoutFormChange);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
