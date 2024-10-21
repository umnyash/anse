/* * * * * * * * * * * * * * * * * * * * * * * *
 *  birth-date-modal-form.js
 */
class BirthDateModalForm extends Modal {
  constructor(modalElement, infoModal) {
    super(modalElement);
    this.formElement = modalElement.querySelector('.birth-date-modal-form');
    this.dayFieldElement = this.formElement.querySelector('.birth-date-modal-form__item-day input');
    this.monthFieldElement = this.formElement.querySelector('.birth-date-modal-form__item-month .select__control');
    this.yearFieldElement = this.formElement.querySelector('.birth-date-modal-form__item-year input');
    this.submitButtonElement = this.formElement.querySelector('.birth-date-modal-form__submit-button');
    this.backButtonElement = this.formElement.querySelector('.birth-date-modal-form__back-button');
    this.actionUrl = this.formElement.action;
    this.infoModal = infoModal;

    this.form = new PubSub();
    this.form.formElement = this.formElement;

    this.step = 1;
    this.init();
  }

  validate = () => this.dayFieldElement.value
    && this.dayFieldElement.value <= 31
    && this.monthFieldElement.value
    && this.yearFieldElement.value
    && +this.yearFieldElement.value > 1900
    && +this.yearFieldElement.value <= new Date().getFullYear();

  disableSubmitButton = () => {
    this.submitButtonElement.classList.add('button--disabled');
    this.submitButtonElement.disabled = true;
  };

  enableSubmitButton = () => {
    this.submitButtonElement.classList.remove('button--disabled');
    this.submitButtonElement.disabled = false;
  };

  setSumbitButtonState = () => {
    const isValid = this.validate();

    if (isValid) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  };

  switchStep = (step) => {
    if (step === 1) {
      this.formElement.classList.remove('birth-date-modal-form--step-2');
      this.step = 1;
    } else if (step === 2) {
      this.formElement.classList.add('birth-date-modal-form--step-2');
      this.step = 2;
    }
  }

  updateBlockOnPage = () => {
    const wrapperElement = document.querySelector('.profile-form__birth-date');
    const labelElement = wrapperElement.querySelector('.profile-form__birth-date-label');
    const formOpenerElement = wrapperElement.querySelector('.profile-form__birth-date-button');

    const buttonElement = createElementByString(`
      <button class="profile-form__birth-data-info-button info-button" type="button" data-modal-opener="birth-date-info">
        <span class="visually-hidden">Изменить дату рождения</span>
      </button>
    `);

    this.infoModal.initOpener(buttonElement);

    const dateElement = createElementByString(`
      <p class="profile-form__birth-date-value">
        <span>${this.dayFieldElement.value}</span>
        <span>${MONTHS_NAMES[this.monthFieldElement.value - 1]}</span>
        <span>${this.yearFieldElement.value}</span>
      </p>
    `);

    labelElement.insertAdjacentElement('afterend', buttonElement);
    formOpenerElement.replaceWith(dateElement);
  }

  onFormInput = (evt) => {
    this.setSumbitButtonState();
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();

    if (this.step === 1) {
      this.switchStep(2);
    } else if (this.step === 2) {
      this.form.emit(FormEvents.SUBMIT_START);
      this.submitButtonElement.disabled = true;
      this.submitButtonElement.classList.add('button--pending');
      const formData = new FormData(evt.target);

      sendData(
        this.actionUrl,
        formData,
        (data) => {
          this.close();
          showNotification({
            text: 'Данные профиля<br> успешно сохранены',
            status: 'success'
          });
          this.updateBlockOnPage();
        },
        (data) => {
          const alert = showAlert({
            heading: 'Не получилось сохранить дату',
            button: {
              text: 'Попробовать еще раз'
            }
          });

          initFormResending(this.form, alert);
        },
        () => {
          this.form.emit(FormEvents.SUBMIT_END);
          this.submitButtonElement.disabled = false;
          this.submitButtonElement.classList.remove('button--pending');
        }
      );
    }
  };

  onBackButtonClick = () => {
    this.switchStep(1);
  };

  init = () => {
    this.setSumbitButtonState();
    this.formElement.addEventListener('change', this.onFormInput);
    this.formElement.addEventListener('input', this.onFormInput);
    this.formElement.addEventListener('submit', this.onFormSubmit);
    this.backButtonElement.addEventListener('click', this.onBackButtonClick);

    this.onOpenerClick = () => {
      this.switchStep(1);
    };
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
