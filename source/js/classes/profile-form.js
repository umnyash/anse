/* * * * * * * * * * * * * * * * * * * * * * * *
 *  checkout-form.js
 */
class ProfileForm extends Form {
  constructor(formElement, options) {
    super(formElement, options);

    this.formElement = formElement;
    this.countryFieldElement = this.formElement.querySelector('.profile-form__country select');
    this.countrySelect = initSelect(this.countryFieldElement);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
