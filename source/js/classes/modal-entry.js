/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal-entry.js
 */
class ModalEntry extends Modal {
  RESEND_TIME_INTERVAL = 7;
  timer = 0;
  RUSSIAN_PHONE_NUMBER_LENGTH = 11;
  ERROR_MESSAGE_DURATION = 5000;

  constructor(modalElement) {
    super(modalElement);

    this.codeFormElement = modalElement.querySelector('.modal-entry__form--code');
    this.phoneFieldElement = this.codeFormElement.querySelector('.modal-entry__phone-field .text-field__control');
    this.phoneFieldMask = null;
    this.phoneFormatTogglerElement = this.codeFormElement.querySelector('.modal-entry__phone-format-toggler');
    this.isRussianPhoneFormat = true;

    this.loginFormElement = modalElement.querySelector('.modal-entry__form--login');
    this.currentPhoneTextElement = this.loginFormElement.querySelector('[data-current-phone-text]');
    this.resendElement = this.loginFormElement.querySelector('.modal-entry__resend');
    this.resendTimerElement = this.resendElement.querySelector('.modal-entry__resend-timer');
    this.resendButtonElement = this.resendElement.querySelector('.modal-entry__resend-button');
    this.loginFormSubmitButtonElement = this.loginFormElement.querySelector('.modal-entry__submit-button');
    this.codeFieldsWrapperElement = this.loginFormElement.querySelector('.modal-entry__code-fields');
    this.codeFieldElements = Array.from(this.codeFieldsWrapperElement.querySelectorAll('.modal-entry__code-field .text-field__control'));

    this.init();
  }

  showCodeFormErrorMessage = () => {
    this.codeFormElement.classList.add('modal-entry__form--error');

    setTimeout(() => {
      this.codeFormElement.classList.remove('modal-entry__form--error');
    }, this.ERROR_MESSAGE_DURATION);
  };

  showLoginFormErrorMessage = () => {
    this.loginFormElement.classList.add('modal-entry__form--error');

    setTimeout(() => {
      this.loginFormElement.classList.remove('modal-entry__form--error');
    }, this.ERROR_MESSAGE_DURATION);
  };

  enableRussianPhoneFormat = () => {
    this.phoneFieldElement.placeholder = '+7 (_ _ _) _ _ _-_ _-_ _';
    this.phoneFieldMask?.destroy();
    this.phoneFieldMask = new IMask(this.phoneFieldElement, {
      mask: '+{7} (000) 000-00-00'
    });
    this.isRussianPhoneFormat = true;
  };

  disableRussianPhoneFormat = () => {
    this.phoneFieldMask?.destroy();
    this.phoneFieldElement.placeholder = '';
    this.phoneFieldMask = new IMask(this.phoneFieldElement, {
      mask: '00000000000000000',
    });
    this.isRussianPhoneFormat = false;
  };

  onPhoneFormatTogglerClick = () => {
    if (this.isRussianPhoneFormat) {
      this.disableRussianPhoneFormat();
      this.phoneFormatTogglerElement.querySelector('.button__text').textContent = 'Российский номер';
    } else {
      this.enableRussianPhoneFormat();
      this.phoneFormatTogglerElement.querySelector('.button__text').textContent = 'Другой формат номера';
    }
  };

  validatePhoneField = () => {
    if (!this.phoneFieldElement.value) {
      return false;
    }

    if (this.isRussianPhoneFormat && this.phoneFieldMask.unmaskedValue.length < this.RUSSIAN_PHONE_NUMBER_LENGTH) {
      return false;
    }

    return true;
  };

  validateCodeFields = () => {
    return this.codeFieldElements.every((fieldElement) => fieldElement.value);
  };

  onCodeFieldsWrapperInput = () => {
    const isValid = this.validateCodeFields();

    if (isValid) {
      this.loginFormSubmitButtonElement.disabled = false;
      this.loginFormSubmitButtonElement.classList.remove('button--disabled');
    } else {
      this.loginFormSubmitButtonElement.disabled = true;
      this.loginFormSubmitButtonElement.classList.add('button--disabled');
    }
  };

  startTimer = () => {
    if (this.timer <= 0) {
      this.timer = this.RESEND_TIME_INTERVAL;
      this.resendTimerElement.textContent = this.timer;
      this.resendElement.classList.add('modal-entry__resend--waiting');

      const timerId = setInterval(() => {
        this.timer--;
        this.resendTimerElement.textContent = this.timer;

        if (this.timer <= 0) {
          clearInterval(timerId);
          this.resendElement.classList.remove('modal-entry__resend--waiting');
        }
      }, 1000);
    }
  }

  switchStep = (step) => {
    if (step === 1) {
      this.codeFormElement.classList.remove('modal-entry__form--hidden');
      this.loginFormElement.classList.add('modal-entry__form--hidden');
    } else if (step === 2) {
      this.startTimer();
      this.currentPhoneTextElement.textContent = this.phoneFieldElement.value;
      this.codeFormElement.classList.add('modal-entry__form--hidden');
      this.loginFormElement.classList.remove('modal-entry__form--hidden');
    }
  }

  reset = () => {
    this.codeFormElement.reset();
    this.loginFormElement.reset();
    this.loginFormSubmitButtonElement.disabled = true;
    this.loginFormSubmitButtonElement.classList.add('button--disabled');
    this.switchStep(1);
  };

  init = () => {
    this.enableRussianPhoneFormat();

    this.phoneFormatTogglerElement.addEventListener('click', this.onPhoneFormatTogglerClick);

    this.resendButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.startTimer();
    });

    this.codeFieldElements.forEach((fieldElement, index) => {
      fieldElement.addEventListener('input', () => {
        fieldElement.value = fieldElement.value.slice(0, 1);

        if (fieldElement.value.length && index < +this.codeFieldElements.length - 1) {
          this.codeFieldElements[index + 1].focus();
        }
      });

      fieldElement.addEventListener('keydown', (evt) => {
        if (isBackspaceEvent(evt) && !fieldElement.value && index > 0) {
          this.codeFieldElements[index - 1].focus();
        }
      });
    });

    this.codeFieldsWrapperElement.addEventListener('input', this.onCodeFieldsWrapperInput);

    this.onOpenerClick = () => {
      this.reset();
    };
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */
