"use strict";

/* * * * * * * * * * * * * * * * * * * * * * * *
 * const.js
 */
const LAPTOP_WIDTH_MEDIA_QUERY = '(min-width: 1280px)';
const MODAL_ANIMATION_DURATION = 400; // Соответствует $duration-m в variables.scss

const FormEvents = {
  SUBMIT_START: 'formSubmitStart',
  SUBMIT_END: 'formSubmitEnd'
};
const KeyCode = Object.freeze({
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
  UP_ARROW: 'ArrowUp',
  SPACE: 'Space',
  BACKSPACE: 'Backspace',
  ESCAPE: 'Escape'
});
const MONTHS_NAMES = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
function lockPageScroll() {
  const pageScrollWrapperElement = document.querySelector('.simplebar-content-wrapper');
  pageScrollWrapperElement.classList.add('scroll-lock');
}
function unlockPageScroll() {
  const pageScrollWrapperElement = document.querySelector('.simplebar-content-wrapper');
  pageScrollWrapperElement.classList.remove('scroll-lock');
}
function createElementByString(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}
function isDownArrowEvent(evt) {
  return evt.code === KeyCode.DOWN_ARROW;
}
function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}
function isLeftArrowEvent(evt) {
  return evt.code === KeyCode.LEFT_ARROW;
}
function isRightArrowEvent(evt) {
  return evt.code === KeyCode.RIGHT_ARROW;
}
function isSpaceEvent(evt) {
  return evt.code === KeyCode.SPACE;
}
function isBackspaceEvent(evt) {
  return evt.code === KeyCode.BACKSPACE;
}
function isUpArrowEvent(evt) {
  return evt.code === KeyCode.UP_ARROW;
}
function debounce(callback) {
  var _this = this;
  let timeoutDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let timeoutId;
  return function () {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(_this, rest), timeoutDelay);
  };
}
function throttleAndDebounce(func, wait) {
  let lastTime = 0;
  let timeout;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    const now = new Date().getTime();
    if (now - lastTime >= wait) {
      lastTime = now;
      func.apply(this, args);
    }
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
function getPaginationButtonCreator() {
  let slideName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Слайд';
  return (index, className) => `
    <button class='${className}' type='button'>
      <span class='visually-hidden'>${slideName} ${index + 1}.</span>
    </button>
  `;
}
function initFormResending(form, alert) {
  alert.button.addEventListener('click', evt => {
    evt.preventDefault();
    form.addListener(FormEvents.SUBMIT_START, onFormSubmitStart);
    form.formElement.requestSubmit();
  });
  function onFormSubmitStart() {
    form.removeListener(FormEvents.SUBMIT_START, onFormSubmitStart);
    form.addListener(FormEvents.SUBMIT_END, onFormSubmitEnd);
    alert.button.disabled = true;
    alert.button.classList.add('button--pending');
  }
  ;
  function onFormSubmitEnd() {
    form.removeListener(FormEvents.SUBMIT_END, onFormSubmitEnd);
    alert.close();
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * api.js
 */
async function sendData(url, body) {
  let onSuccess = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
  let onFail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => {};
  let onFinally = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : () => {};
  try {
    const response = await fetch(url, {
      method: 'POST',
      body
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`${response.status} – ${response.statusText}: ${errorData}`);
    }
    const data = await response.json();
    onSuccess(data);
  } catch (err) {
    console.error(err.message);
    onFail();
  } finally {
    onFinally();
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

class PubSub {
  constructor() {
    this.listeners = {};
  }
  addListener(event, fn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(fn);
  }
  removeListener(event, fn) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
  }
  emit(event, data) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(listener => listener(data));
  }
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal.js
 */
class Modal {
  // static openModalsCount = 0;

  constructor(modalElement) {
    let {
      onOpenerClick
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.modalElement = modalElement;
    this.name = modalElement?.dataset.modal;
    this.initOpeners();
    this.modalElement.addEventListener('close', () => this.onModalClose());
    this.onOpenerClick = onOpenerClick;
    this.modalElement.addEventListener('click', evt => {
      if (evt.target === this.modalElement || evt.target.closest('[data-modal-close-button]') || !evt.target.closest('.modal__inner')) {
        evt.preventDefault();
        this.close();
      }
    });
    if (!document.body.contains(this.modalElement)) {
      document.body.append(this.modalElement);
    }
  }
  initOpener = openerElement => {
    openerElement.addEventListener('click', evt => {
      evt.preventDefault();
      if (this.onOpenerClick) {
        this.onOpenerClick(evt);
      }
      this.open();
    });
  };
  initOpeners = () => {
    const openerElements = document.querySelectorAll(`[data-modal-opener="${this.name}"]`);
    openerElements.forEach(this.initOpener);
  };
  open = () => {
    this.modalElement.showModal();
  };
  close = () => {
    this.modalElement.close();
  };
  onModalClose = () => {
    setTimeout(() => {
      if (this.modalElement.classList.contains('modal--with_alert')) {
        this.modalElement.remove();
        this.modalElement = null;
      }
    }, MODAL_ANIMATION_DURATION);
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * alert.js
 */
class Alert extends Modal {
  constructor(_ref) {
    let {
      heading,
      button,
      icon
    } = _ref;
    const modalElement = Alert.createElement({
      heading,
      button,
      icon
    });
    document.body.append(modalElement);
    super(modalElement);
    this.button = modalElement.querySelector('.alert__button');
  }
  static createElement(_ref2) {
    let {
      heading,
      button,
      icon
    } = _ref2;
    const modalString = `
      <dialog class="modal modal--default modal--with_alert">
        <div class="modal__inner">
          <button class="modal__button modal__button--close" type="button" data-modal-close-button>
            <span class="visually-hidden">Закрыть</span>
          </button>
          <section class="alert modal__alert ${icon && "alert--with-icon"}">
            <h2 class="alert__heading">${heading}</h2>
            <button class="alert__button button button--solid-primary ${button.classes || ''}" ${!button.text && "data-modal-close-button"}>
              <span class="button__inner">
                <span class="button__text">${button.text || "Закрыть"}</span>
              </span>
            </button>
          </section>
        </div>
      </dialog>
    `;
    return createElementByString(modalString);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * form-validator.js
 */
class FormValidator {
  constructor(formElement) {
    this.formElement = formElement;
    this.addCustomErrorMessages();
    this.init();
  }
  addCustomErrorMessages() {
    const nameFieldElement = this.formElement.querySelector('[data-name="name"]');
    const surnameFieldElement = this.formElement.querySelector('[data-name="surname"]');
    const addressFieldElement = this.formElement.querySelector('[data-name="address"]');
    const phoneFieldElement = this.formElement.querySelector('[data-name="phone"]');
    const emailFieldElement = this.formElement.querySelector('[data-name="email"]');
    const messageFieldElement = this.formElement.querySelector('[data-name="message"]');
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
  }
  validate() {
    return this.pristine.validate();
  }
  reset() {
    this.pristine.reset();
    this.formElement.querySelectorAll('.shake').forEach(element => element.classList.remove('shake'));
  }
  init() {
    this.pristine = new Pristine(this.formElement, {
      classTo: 'pristine-item',
      errorClass: 'pristine-item--invalid',
      errorTextParent: 'pristine-item',
      errorTextTag: 'p',
      errorTextClass: 'pristine-item__error-text'
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * form.js
 */
class Form extends PubSub {
  constructor(formElement) {
    super();
    this.formElement = formElement;
    this.textFieldControlElements = this.formElement.querySelectorAll('.text-field__control, .simple-form__control, .text-area__control');
    this.imagesFieldElement = this.formElement.querySelector('.images-field');
    this.imagesFieldListElement = this.formElement.querySelector('.images-field__list');
    this.actionUrl = this.formElement.action;
    this.submitButtonElement = this.formElement.querySelector('[data-submit-button]');
    this.validator = new FormValidator(this.formElement);
    this.siteHeaderElement = document.querySelector('.page__site-header');
    this.successHandler = null;
    this.errorHandler = null;
    this.imagesFieldErrorTextElement = null;
    this.init();
  }
  setHandlers = (successHandler, errorHandler) => {
    this.successHandler = successHandler;
    this.errorHandler = errorHandler;
  };
  resetImagesField = () => {
    if (this.imagesFieldListElement) {
      this.imagesFieldListElement.querySelectorAll('img').forEach(imageElement => {
        URL.revokeObjectURL(imageElement.src);
      });
      this.imagesFieldListElement.innerHTML = '';
    }
    if (this.images) {
      this.images.clear();
    }
  };
  initImagesField = fieldElement => {
    const controlElement = fieldElement.querySelector('.images-field__control');
    const listElement = fieldElement.querySelector('.images-field__list');
    this.images = new Set();
    controlElement.addEventListener('change', evt => {
      this.imagesFieldErrorTextElement?.remove();
      const newFiles = Array.from(evt.target.files);
      newFiles.forEach(file => {
        if (file.type.startsWith('image/') && PHOTO_TYPES.some(it => file.name.toLowerCase().endsWith(it))) {
          this.images.add(file);
        } else {
          this.imagesFieldErrorTextElement = createElementByString(`<p class="images-field__error-text">Не удалось загрузить фото, попробуйте снова</p>`);
          listElement.insertAdjacentElement('beforebegin', this.imagesFieldErrorTextElement);
        }
      });
      updateList();
    });
    const updateList = () => {
      const fragment = document.createDocumentFragment();
      this.images.forEach(file => {
        const listItemElement = createElementByString(`
          <li class="images-field__list-item">
            <img class="images-field__preview" src=${URL.createObjectURL(file)} alt=''>
            <button class="images-field__delete-button image-button image-button--size_xs image-button--primary image-button--icon_cross" type="button">
              <span class="visually-hidden">Удалить фото</span>
            </button>
          </li>
        `);
        const previewElement = listItemElement.querySelector('.images-field__preview');
        const deleteButtonElement = listItemElement.querySelector('.images-field__delete-button');
        deleteButtonElement.addEventListener('click', evt => {
          this.images.delete(file);
          updateList();
          URL.revokeObjectURL(previewElement.src);
        });
        fragment.append(listItemElement);
      });
      listElement.innerHTML = '';
      listElement.append(fragment);
    };
  };
  init = () => {
    if (this.imagesFieldElement) {
      this.initImagesField(this.imagesFieldElement);
    }
    this.formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      const isValid = this.validator.validate();
      if (isValid) {
        this.emit(FormEvents.SUBMIT_START);
        this.submitButtonElement.disabled = true;
        this.submitButtonElement.classList.add('button--pending');
        const formData = new FormData(evt.target);
        this.images?.forEach(file => {
          formData.append('images[]', file);
        });
        sendData(this.actionUrl, formData, data => {
          this.successHandler(data);
          if (!this.formElement.matches('.modal-entry__form--code')) {
            this.formElement.reset();
          }
        }, data => {
          this.errorHandler(data);
        }, () => {
          this.emit(FormEvents.SUBMIT_END);
          this.submitButtonElement.disabled = false;
          this.submitButtonElement.classList.remove('button--pending');
        });
      } else {
        if (this.formElement.matches('.simple-form')) {
          const fieldWrapperElement = this.formElement.querySelector('.simple-form__inner');
          fieldWrapperElement.classList.remove('shake');
          requestAnimationFrame(() => fieldWrapperElement.classList.add('shake'));
          fieldWrapperElement.querySelector('input').focus();
        } else {
          const firstInvalidItemElement = this.formElement.querySelector('.pristine-item--invalid');
          const modalElement = firstInvalidItemElement?.closest('.modal');
          if (modalElement) {
            modalElement.scrollTo({
              top: firstInvalidItemElement.offsetTop,
              behavior: 'smooth'
            });
          } else {
            window.scrollTo({
              top: firstInvalidItemElement.offsetTop - this.siteHeaderElement.offsetHeight,
              behavior: 'smooth'
            });
          }
          firstInvalidItemElement.querySelector('input, textarea').focus();
          firstInvalidItemElement.classList.remove('shake');
          requestAnimationFrame(() => firstInvalidItemElement.classList.add('shake'));
        }
      }
    });
    this.formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this.textFieldControlElements?.forEach(textFieldElement => {
          textFieldElement.dispatchEvent(inputEvent);
        });
        this.resetImagesField();
        this.validator.reset();
      }, 0);
    });
  };
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal-form.js
 */
class ModalForm extends Modal {
  constructor(modalElement) {
    super(modalElement);
    this.formElement = modalElement.querySelector('.modal-form');
    this.form = new Form(this.formElement);
  }
  setHandlers = (successHandler, errorHandler) => {
    this.form.setHandlers(() => {
      successHandler();
      this.modalElement.close();
    }, () => {
      errorHandler();
    });
  };
}

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
      mask: '00000000000000000'
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
    return this.codeFieldElements.every(fieldElement => fieldElement.value);
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
  };
  switchStep = step => {
    if (step === 1) {
      this.codeFormElement.classList.remove('modal-entry__form--hidden');
      this.loginFormElement.classList.add('modal-entry__form--hidden');
    } else if (step === 2) {
      this.startTimer();
      this.currentPhoneTextElement.textContent = this.phoneFieldElement.value;
      this.codeFormElement.classList.add('modal-entry__form--hidden');
      this.loginFormElement.classList.remove('modal-entry__form--hidden');
    }
  };
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
    this.resendButtonElement.addEventListener('click', evt => {
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
      fieldElement.addEventListener('keydown', evt => {
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 *  birth-date-modal-form.js
 */
class BirthDateModalForm extends Modal {
  constructor(modalElement, infoModal) {
    super(modalElement);
    this.formElement = modalElement.querySelector('.birth-date-modal-form');
    this.dayFieldElement = this.formElement.querySelector('.birth-date-modal-form__item-day input');
    this.monthFieldElement = this.formElement.querySelector('.birth-date-modal-form__month-select');
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
  validate = () => this.dayFieldElement.value && this.monthFieldElement.value;
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
  switchStep = step => {
    if (step === 1) {
      this.formElement.classList.remove('birth-date-modal-form--step-2');
      this.step = 1;
    } else if (step === 2) {
      this.formElement.classList.add('birth-date-modal-form--step-2');
      this.step = 2;
    }
  };
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
  };
  onFormInput = evt => {
    this.setSumbitButtonState();
  };
  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.step === 1) {
      this.switchStep(2);
    } else if (this.step === 2) {
      this.form.emit(FormEvents.SUBMIT_START);
      this.submitButtonElement.disabled = true;
      this.submitButtonElement.classList.add('button--pending');
      const formData = new FormData(evt.target);
      sendData(this.actionUrl, formData, data => {
        this.close();
        showNotification({
          text: 'Данные профиля<br> успешно сохранены',
          status: 'success'
        });
        this.updateBlockOnPage();
      }, data => {
        const alert = showAlert({
          heading: 'Не получилось сохранить дату',
          button: {
            text: 'Попробовать еще раз'
          }
        });
        initFormResending(this.form, alert);
      }, () => {
        this.form.emit(FormEvents.SUBMIT_END);
        this.submitButtonElement.disabled = false;
        this.submitButtonElement.classList.remove('button--pending');
      });
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
  };
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
    return this.sizeModalCheckboxElements.some(checkboxElement => checkboxElement.checked);
  };
  setSizeModalSubmitButtonState = () => {
    const isSizeSelected = this.checkSelectedSizeInModalForm();
    if (isSizeSelected) {
      this.unlockSizeModalSubmitButton();
    } else {
      this.lockSizeModalSubmitButton();
    }
  };
  setCounterValue = value => {
    const minValue = +this.counterElement.min;
    this.counterElement.value = value;
    this.counterButtonMinusElement.disabled = +this.counterElement.value <= minValue;
  };
  onSizeModalFormChange = () => {
    this.setSizeModalSubmitButtonState();
  };
  checkSelectedSize = () => {
    return this.sizeCheckboxElements.some(checkboxElement => checkboxElement.checked);
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 * cart.js
 */
class Cart {
  constructor(cartElement) {
    this.siteHeaderElement = document.querySelector('.page__site-header');
    this.cartElement = cartElement;
    this.formElement = this.cartElement.querySelector('.cart__form');
    this.init();
  }
  toggleFormFooterStickiness = () => {
    if (laptopWidthMediaQueryList.matches) {
      return;
    }
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    const windowHeight = document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    const isAtBottom = windowHeight + scrollPosition >= documentHeight;
    this.formFooterElement.classList.toggle('cart-form__footer--sticked', !isAtBottom);
  };
  setPageBottomIndent = () => {
    if (!laptopWidthMediaQueryList.matches) {
      const bottomValue = parseFloat(getComputedStyle(this.formFooterElement).bottom);
      document.body.style.paddingBottom = `${this.formFooterElement.offsetHeight + bottomValue}px`;
    } else {
      document.body.style.paddingBottom = 0;
    }
  };
  onWindowResize = debounce(this.setPageBottomIndent, 500);
  onWindowScroll = throttle(this.toggleFormFooterStickiness, 100);
  onReceivingMethodSectionChange = evt => {
    if (evt.target.dataset.value === 'delivery') {
      this.receivingMethodSectionElement.insertAdjacentElement('afterend', this.deliverySectionElement);
      this.form.validator.reset();
      this.form.validator.init();
    } else {
      this.deliverySectionElement.remove();
      this.form.validator.reset();
      this.form.validator.init();
    }
  };
  init() {
    if (!this.formElement) {
      return;
    }
    this.formFooterElement = this.formElement.querySelector('.cart-form__footer');
    this.form = new Form(this.formElement);
    this.productsList = this.formElement.querySelector('.cart-form__products-list');
    this.deliverySectionElement = this.formElement.querySelector('[data-delivery-section]');
    this.receivingMethodSectionElement = this.formElement.querySelector('[data-receiving-method-section]');
    this.deliverySectionElement.querySelectorAll('.text-field').forEach(initTextField);
    this.deliverySectionElement.remove();
    this.form.validator.init();
    this.setPageBottomIndent();
    this.toggleFormFooterStickiness();
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('scroll', this.onWindowScroll);
    this.receivingMethodSectionElement.addEventListener('change', this.onReceivingMethodSectionChange);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
    const targetTab = this.tabElements.find(tabElement => tabElement.hash === targetTabHash);
    this.switchTab(null, targetTab || this.tabElements[0], true);
  };
  onTaberListClick = evt => {
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
  onTaberListKeydown = evt => {
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews.js
 */
class Reviews {
  constructor(reviewsElement) {
    this.reviewsElement = reviewsElement;
    this.listElement = reviewsElement.querySelector('.reviews-list');
    this.init();
  }
  updateReviewsTextWrappersList = () => {
    this.reviewTextWrapperElements = this.listElement.querySelectorAll('.review__text-wrapper');
  };
  setReviewsTextWrappersMode = () => {
    this.reviewTextWrapperElements.forEach(textWrapperElement => {
      const isClipped = textWrapperElement.classList.contains('review__text-wrapper--clipped');
      textWrapperElement.classList.add('review__text-wrapper--clipped');
      const textElement = textWrapperElement.querySelector('.review__text');
      if (textElement.scrollHeight - textElement.offsetHeight > 5) {
        textWrapperElement.classList.add('review__text-wrapper--clippable');
      } else {
        textWrapperElement.classList.remove('review__text-wrapper--clippable');
      }
      if (!isClipped) {
        textWrapperElement.classList.remove('review__text-wrapper--clipped');
      }
    });
  };
  onWindowResize = debounce(this.setReviewsTextWrappersMode, 500);
  onListClick = evt => {
    const toggleButtonElement = evt.target.closest('.review__toggle-button');
    if (toggleButtonElement) {
      const textWrapperElement = toggleButtonElement.closest('.review__text-wrapper');
      textWrapperElement.classList.toggle('review__text-wrapper--clipped');
    }
  };
  init() {
    this.updateReviewsTextWrappersList();
    this.setReviewsTextWrappersMode();
    window.addEventListener('resize', this.onWindowResize);
    this.listElement.addEventListener('click', this.onListClick);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * video.js
 */
class Video {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.posterElement = videoElement.querySelector('.video__poster');
    this.playButtonWrapperElement = videoElement.querySelector('.video__play-button-wrapper');
    this.playButtonElement = videoElement.querySelector('.video__play-button');
    this.playerElement = videoElement.querySelector('.video__player');
    this.init();
  }
  play = () => {
    this.playerElement.play();
    this.playButtonWrapperElement.classList.add('video__play-button-wrapper--hidden');
    this.posterElement.classList.add('video__poster--hidden');
  };
  init() {
    this.playButtonElement.addEventListener('click', () => {
      this.play();
    });
    this.playerElement.addEventListener('ended', () => {
      this.playButtonWrapperElement.classList.remove('video__play-button-wrapper--hidden');
      this.posterElement.classList.remove('video__poster--hidden');
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-photos.js
 */
let activeButtonElement = null;
function onDocumentClickWhileArticlePhotosButtonExpanded(evt) {
  const captionButtonElement = evt.target.closest('.article__photos button');
  if (!captionButtonElement && activeButtonElement) {
    activeButtonElement.ariaExpanded = 'false';
    activeButtonElement = null;
  }
  document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
}
function initArticlePhotos(photosElement) {
  photosElement.addEventListener('click', evt => {
    const captionButtonElement = evt.target.closest('.article__photos button');
    if (!captionButtonElement) {
      return;
    }
    if (activeButtonElement && activeButtonElement !== captionButtonElement) {
      activeButtonElement.ariaExpanded = 'false';
    }
    const isExpanded = captionButtonElement.ariaExpanded === 'true';
    if (isExpanded) {
      captionButtonElement.ariaExpanded = 'false';
      activeButtonElement = null;
      document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    } else {
      captionButtonElement.ariaExpanded = 'true';
      activeButtonElement = captionButtonElement;
      document.addEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    }
    evt.stopPropagation();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-seasons.js
 */
function initArticleSeasons(wrapperElement) {
  const sliderElement = createElementByString(`
    <div class="seasons-slider swiper">
      <p class="seasons-slider__pagination"></p>
    </div>
  `);
  const listElement = wrapperElement.querySelector('ul');
  sliderElement.append(listElement);
  listElement.classList.add('seasons-slider__list', 'swiper-wrapper');
  const slideElements = listElement.querySelectorAll('li');
  slideElements.forEach(slideElement => slideElement.classList.add('seasons-slider__item', 'swiper-slide'));
  wrapperElement.append(sliderElement);
  new Swiper(sliderElement, {
    effect: 'flip',
    speed: 600,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.seasons-slider__pagination',
      clickable: true,
      bulletClass: 'seasons-slider__pagination-button',
      bulletActiveClass: 'seasons-slider__pagination-button--active',
      renderBullet: (index, className) => `
        <button class='${className}' type='button'>
          ${slideElements[index].dataset.label}
        </button>
      `
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * brands-slider.js
 */
function initBrandsSlider(brandsElement) {
  const sliderElement = brandsElement.querySelector('.brands__slider');
  const prevButtonElement = brandsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = brandsElement.querySelector('.slider-arrows__button--next');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 28,
    grabCursor: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 60
      },
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 103
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 144
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogFilter(catalogElement, pageScrollWrapperElement) {
  const filterToggleButtonElement = catalogElement.querySelector('.catalog__filter-button');
  const filterWrapperElement = catalogElement.querySelector('.catalog__filter-wrapper');
  const catalogHeaderElement = catalogElement.querySelector('.catalog__header');
  const filterCloseButtonElement = filterWrapperElement.querySelector('.catalog-filter__close-button');
  const catalogBodyElement = catalogElement.querySelector('.catalog__body');
  const checkerElements = filterWrapperElement.querySelectorAll('.checker__control');
  const clearButtonElement = filterWrapperElement.querySelector('.catalog-filter__clear-button');
  const onPageScroll = () => {
    if (catalogElement.classList.contains('catalog--filter-open')) {
      setFilterHeight();
    }
  };
  const clearFilter = () => {
    checkerElements.forEach(checkerElement => {
      checkerElement.checked = false;
      checkerElement.dispatchEvent(inputEvent);
    });
  };
  const setFilterHeight = () => {
    filterWrapperElement.style.height = `${Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight - catalogHeaderElement.getBoundingClientRect().bottom)}px`;
  };
  const onWindowResize = () => {
    if (catalogElement.classList.contains('catalog--filter-open')) {
      setFilterHeight();
    }
  };
  function openFilter() {
    setFilterHeight();
    catalogElement.classList.add('catalog--filter-open');
    catalogBodyElement.addEventListener('click', onCatalogBodyClick);
  }
  ;
  function closeFilter() {
    catalogElement.classList.remove('catalog--filter-open');
    catalogBodyElement.removeEventListener('click', onCatalogBodyClick);
  }
  ;
  function onCatalogBodyClick(evt) {
    if (!evt.target.closest('.catalog__filter-wrapper')) {
      closeFilter();
    }
  }
  filterToggleButtonElement.addEventListener('click', () => {
    if (catalogElement.classList.contains('catalog--filter-open')) {
      closeFilter();
    } else {
      openFilter();
    }
  });
  filterCloseButtonElement.addEventListener('click', evt => {
    closeFilter();
  });
  window.addEventListener('resize', onWindowResize);
  new SimpleBar(catalogElement.querySelector('.catalog-filter__sections'), {
    autoHide: false
  });
  clearButtonElement.addEventListener('click', () => {
    clearFilter();
  });
  pageScrollWrapperElement.addEventListener('scroll', onPageScroll);
}

/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-preview-slider.js
 */
function initCatalogPreviewSlider(sliderElement) {
  const paginationElement = sliderElement.querySelector('.slider-pagination');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: paginationElement,
      type: 'progressbar'
    },
    breakpoints: {
      390: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      790: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * catalog-sorting.js
 */
function initCatalogSorting(sortingElement) {
  sortingElement.addEventListener('click', evt => {
    if (evt.target.closest('.catalog__sorting-toggle-button')) {
      if (sortingElement.classList.contains('catalog__sorting--open')) {
        close();
      } else {
        open();
      }
    } else {
      const linkElement = evt.target.closest('.catalog__sorting-link');
      if (!linkElement) {
        return;
      }
      sortingElement.querySelector('.catalog__sorting-toggle-button').textContent = linkElement.textContent;
      sortingElement.querySelector('.catalog__sorting-link--active')?.classList.remove('catalog__sorting-link--active');
      linkElement.classList.add('catalog__sorting-link--active');
      close();
    }
  });
  function onDocumentClick(evt) {
    const targetElement = evt.target.closest('.catalog__sorting');
    if (targetElement !== sortingElement || evt.target.matches('.catalog__sorting-list')) {
      evt.preventDefault();
      close();
    }
  }
  function open() {
    sortingElement.classList.add('catalog__sorting--open');
    setTimeout(() => {
      document.addEventListener('click', onDocumentClick);
    }, 0);
  }
  ;
  function close() {
    sortingElement.classList.remove('catalog__sorting--open');
    document.removeEventListener('click', onDocumentClick);
  }
  ;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * checkout-products-slider.js
 */
function initCheckoutProductsSlider(sliderElement) {
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 5
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * consumers-photos-slider.js
 */
function initConsumersPhotosSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.consumers-photos__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const paginationElement = sliderWrapperElement.querySelector('.slider-pagination');
  const slider = new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    pagination: {
      el: paginationElement,
      type: 'progressbar'
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
  return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * consumers-photos.js
 */
function initConsumersPhotos() {
  let slider = null;
  let slideElements = null;
  const sliderElement = document.querySelector('.consumers-photos__slider-wrapper');
  if (sliderElement) {
    slideElements = Array.from(sliderElement.querySelectorAll('.consumers-photos__slider-item '));
    slider = initConsumersPhotosSlider(sliderElement);
  }
  let consumersPhotosModal = null;
  let modalSlider = null;
  const consumersPhotosModalElement = document.querySelector('[data-modal="consumers-photos"]');
  if (consumersPhotosModalElement) {
    modalSlider = initGallerySlider(consumersPhotosModalElement.querySelector('.gallery-slider'));
    consumersPhotosModal = new Modal(consumersPhotosModalElement, {
      onOpenerClick: evt => {
        const listItemElement = evt.target.closest('li');
        if (listItemElement && modalSlider) {
          const listItemNumber = slideElements.indexOf(listItemElement);
          modalSlider.slideTo(listItemNumber, 0);
        }
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * folds.js
 */
function initFolds(foldsElement) {
  foldsElement.addEventListener('click', _ref3 => {
    let {
      target
    } = _ref3;
    const buttonElement = target.closest('.folds__button');
    if (!buttonElement) {
      return;
    }
    const foldElement = buttonElement.closest('.folds__item');
    const contentWrapperElement = foldElement.querySelector('.folds__item-content-wrapper');
    const contentElement = contentWrapperElement.querySelector('.folds__item-content');
    const contentElementHeight = contentElement.getBoundingClientRect().height;
    contentWrapperElement.style.height = `${contentElementHeight}px`;
    contentElement.style.position = 'absolute';
    setTimeout(() => {
      foldElement.classList.toggle('folds__item--open');
    }, 20);
    buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
  });
  foldsElement.addEventListener('transitionend', _ref4 => {
    let {
      target
    } = _ref4;
    const foldElement = target.closest('.folds__item');
    if (!foldElement || !foldElement.classList.contains('folds__item--open')) {
      return;
    }
    if (target.classList.contains('folds__item-content')) {
      target.style.position = 'static';
    }
    if (target.classList.contains('folds__item-content-wrapper')) {
      setTimeout(() => {
        target.style.height = 'auto';
      }, 0);
    }
  });
}
;
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * gallery-slider.js
 */
function initGallerySlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.gallery-slider__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const slider = new Swiper(sliderElement, {
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    },
    speed: 500,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true
  });
  return slider;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * menu.js
 */
function initMenu(menuElement) {
  const openerElement = document.querySelector('.site-header__burger');
  menuElement.addEventListenerClick;
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * page-scrollbar.js
 */
function initPageScrollbar(pageInnerElement) {
  return new SimpleBar(pageInnerElement, {
    classNames: {
      contentEl: 'page__inner'
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product-info.js
 */
function initProductInfo(productInfoElement) {
  const closeOpenedItems = targetFoldElement => {
    productInfoElement.querySelectorAll('.product-info__item--open').forEach(openItemElement => {
      if (openItemElement !== targetFoldElement) {
        openItemElement.classList.remove('product-info__item--open');
        openItemElement.querySelector('.product-info__button').ariaExpanded = 'false';
      }
    });
  };
  const openFirstItem = () => {
    const firstItemElement = productInfoElement.querySelector('.product-info__item');
    const buttonElement = firstItemElement.querySelector('.product-info__button');
    firstItemElement.classList.add('product-info__item--open');
    buttonElement.ariaExpanded = 'true';
  };
  productInfoElement.addEventListener('click', _ref5 => {
    let {
      target
    } = _ref5;
    const buttonElement = target.closest('.product-info__button');
    if (!buttonElement) {
      return;
    }
    const foldElement = buttonElement.closest('.product-info__item');
    if (laptopWidthMediaQueryList.matches) {
      closeOpenedItems(foldElement);
    }
    const contentWrapperElement = foldElement.querySelector('.product-info__content-wrapper');
    const contentElement = contentWrapperElement.querySelector('.product-info__content');
    const contentElementHeight = contentElement.getBoundingClientRect().height;
    contentWrapperElement.style.height = `${contentElementHeight}px`;
    contentElement.style.position = 'absolute';
    setTimeout(() => {
      foldElement.classList.toggle('product-info__item--open');
    }, 20);
    buttonElement.ariaExpanded = buttonElement.ariaExpanded === 'true' ? 'false' : 'true';
  });
  productInfoElement.addEventListener('transitionend', _ref6 => {
    let {
      target
    } = _ref6;
    const foldElement = target.closest('.product-info__item');
    if (!foldElement || !foldElement.classList.contains('product-info__item--open')) {
      return;
    }
    if (target.classList.contains('product-info__content')) {
      target.style.position = 'static';
    }
    if (target.classList.contains('product-info__content-wrapper')) {
      setTimeout(() => {
        target.style.height = 'auto';
      }, 0);
    }
  });
  laptopWidthMediaQueryList.addEventListener('change', () => {
    if (laptopWidthMediaQueryList.matches) {
      closeOpenedItems();
      openFirstItem();
    }
  });
  openFirstItem();

  // Custom scroll
  productInfoElement.querySelectorAll('.product-info__content-wrapper').forEach(wrapperElement => {
    new SimpleBar(wrapperElement, {
      autoHide: false
    });
  });
}
;
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * product.js
 */
function initProduct(productElement) {
  const sliderElement = productElement.querySelector('.product__slider');
  const initSlider = () => {
    const slider = new Swiper(sliderElement, {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      },
      speed: 500,
      pagination: {
        el: '.product__slider-pagination',
        bulletClass: 'product__slider-pagination-button',
        bulletActiveClass: 'product__slider-pagination-button--current',
        renderBullet: getPaginationButtonCreator(),
        clickable: true
      }
    });
  };
  initProductInfo(productElement.querySelector('.product-info'));

  // Модальное окно с фотографиями и видео
  const modalElement = document.querySelector('[data-modal="product-gallery"]');
  const sliderItemElements = Array.from(sliderElement.querySelectorAll('.product__slider-item'));
  const mediaElements = Array.from(productElement.querySelectorAll('.product__image-wrapper, .product__video-wrapper'));
  const modalMediaElements = modalElement.querySelectorAll('.modal-gallery__list-item');
  new SimpleBar(modalElement, {
    autoHide: false
  });
  new Modal(modalElement, {
    onOpenerClick: evt => {
      let mediaElementIndex;
      if (laptopWidthMediaQueryList.matches) {
        mediaElementIndex = mediaElements.indexOf(evt.currentTarget);
      } else {
        mediaElementIndex = sliderItemElements.indexOf(evt.currentTarget);
      }
      setTimeout(() => {
        modalMediaElements[mediaElementIndex].scrollIntoView({
          behavior: 'smooth'
        });
      }, 400);
    }
  });
  initSlider();
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * products-counters.js
 */
function initProductsCounters(productsWrapperElement) {
  const toggleButtonsState = (controlElement, buttonMinusElement) => {
    const minValue = +controlElement.min;
    buttonMinusElement.disabled = +controlElement.value <= minValue;
  };
  const toggleAllButtonsState = () => {
    productsWrapperElement.querySelectorAll('.counter').forEach(counterElement => {
      const controlElement = counterElement.querySelector('.counter__control');
      const buttonMinusElement = counterElement.querySelector('.counter__button--minus');
      toggleButtonsState(controlElement, buttonMinusElement);
    });
  };
  toggleAllButtonsState();
  productsWrapperElement.addEventListener('click', evt => {
    const counterButtonElement = evt.target.closest('.counter__button');
    if (!counterButtonElement) {
      return;
    }
    const counterElement = counterButtonElement.closest('.counter');
    const controlElement = counterElement.querySelector('.counter__control');
    const buttonMinusElement = counterElement.querySelector('.counter__button--minus');
    switch (true) {
      case counterButtonElement.matches('.counter__button--minus'):
        controlElement.stepDown();
        break;
      case counterButtonElement.matches('.counter__button--plus'):
        controlElement.stepUp();
        break;
    }
    toggleButtonsState(controlElement, buttonMinusElement);
    controlElement.dispatchEvent(inputEvent);
    controlElement.dispatchEvent(changeEvent);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * products-slider.js
 */
function initProducts(productsElement) {
  const sliderElement = productsElement.querySelector('.products-slider');
  const paginationElement = productsElement.querySelector('.slider-pagination');
  const prevButtonElement = productsElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = productsElement.querySelector('.slider-arrows__button--next');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    pagination: {
      el: paginationElement,
      type: 'progressbar'
    },
    loop: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    breakpoints: {
      390: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      790: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * review-slider.js
 */
function initReviewSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.review__slider');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-intro-photos.js
 */
function initReviewsIntroPhotos() {
  let slider = null;
  let photoSlideElements = null;
  const sliderElement = document.querySelector('.reviews-intro__slider-wrapper');
  if (sliderElement) {
    photoSlideElements = Array.from(sliderElement.querySelectorAll('.reviews-intro__slider-item:not(.reviews-intro__slider-item--quote)'));
    slider = initReviewsIntroSlider(sliderElement);
  }
  let reviewsPhotosModal = null;
  let modalSlider = null;
  const reviewsIntroPhotosModalElement = document.querySelector('[data-modal="reviews-intro-photos"]');
  if (reviewsIntroPhotosModalElement) {
    const modalSliderElement = reviewsIntroPhotosModalElement.querySelector('.gallery-slider');
    modalSlider = initGallerySlider(modalSliderElement);
    reviewsPhotosModal = new Modal(reviewsIntroPhotosModalElement, {
      onOpenerClick: evt => {
        const listItemNumber = photoSlideElements.indexOf(evt.currentTarget);
        modalSlider.slideTo(listItemNumber, 0);
      }
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * reviews-intro-slider.js
 */
function initReviewsIntroSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.reviews-intro__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * search-form.js
 */
function initSearch(searchWrapperElement) {
  const controlElement = searchWrapperElement.querySelector('.search-form__field-control');
  const clearButtonElement = searchWrapperElement.querySelector('.search-form__field-clear-button');
  const updateClearButtonStatus = () => {
    setTimeout(() => {
      clearButtonElement.classList.toggle('search-form__field-clear-button--hidden', !controlElement.value);
    });
  };
  updateClearButtonStatus();
  controlElement.addEventListener('input', () => {
    updateClearButtonStatus();
  });
  searchWrapperElement.addEventListener('click', evt => {
    const controlLabelElement = evt.target.closest('.search__placeholder .button');
    const clearButtonElement = evt.target.closest('.search-form__field-clear-button');
    if (clearButtonElement) {
      controlElement.value = '';
      updateClearButtonStatus();
      controlElement.focus();
      controlElement.dispatchEvent(inputEvent);
      controlElement.dispatchEvent(changeEvent);
      return;
    }
    if (controlLabelElement) {
      controlElement.focus();
      controlElement.selectionStart = controlElement.value.length;
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

function initSelect(selectElement) {
  new Choices(selectElement, {
    // eslint-disable-line
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false
    // placeholder: true,
    // placeholderValue: 'fff',
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * set-slider.js
 */
function initSetSlider(sliderElement) {
  const listElement = sliderElement.querySelector('.set__slider-list');
  const slideElements = listElement.querySelectorAll('.set__slider-item');
  let slider = null;
  const init = () => {
    sliderElement.classList.add('swiper');
    listElement.classList.add('swiper-wrapper');
    slideElements.forEach(sliderElement => sliderElement.classList.add('swiper-slide'));
    slider = new Swiper(sliderElement, {
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      },
      speed: 500,
      pagination: {
        el: '.set__slider-pagination',
        bulletClass: 'set__slider-pagination-button',
        bulletActiveClass: 'set__slider-pagination-button--current',
        renderBullet: getPaginationButtonCreator(),
        clickable: true
      }
    });
  };
  const destroy = () => {
    slider?.destroy();
    sliderElement.classList.remove('swiper');
    listElement.classList.remove('swiper-wrapper');
    slideElements.forEach(sliderElement => sliderElement.classList.remove('swiper-slide'));
  };
  const switchSliderMode = () => {
    if (laptopWidthMediaQueryList.matches) {
      destroy();
    } else {
      init();
    }
  };
  laptopWidthMediaQueryList.addEventListener('change', switchSliderMode);
  switchSliderMode();
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * set.js
 */
function initSet(setElement) {
  const sliderElement = setElement.querySelector('.set__slider');
  const slideElements = Array.from(sliderElement.querySelectorAll('.set__slider-item'));
  const modalElement = document.querySelector('[data-modal="set-gallery"]');
  const modalMediaElements = modalElement.querySelectorAll('.modal-gallery__list-item');
  new SimpleBar(modalElement, {
    autoHide: false
  });
  new Modal(modalElement, {
    onOpenerClick: evt => {
      const slideElementIndex = slideElements.indexOf(evt.currentTarget);
      setTimeout(() => {
        modalMediaElements[slideElementIndex].scrollIntoView({
          behavior: 'smooth'
        });
      }, 400);
    }
  });
  initSetSlider(sliderElement);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * shop-slider.js
 */
function initShopSlider(sliderWrapperElement) {
  const mainSliderElement = sliderWrapperElement.querySelector('.shop__main-slider');
  const thumbnailsSliderElement = sliderWrapperElement.querySelector('.shop__thumbnails-slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  const thumbnailsSwiper = new Swiper(thumbnailsSliderElement, {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    spaceBetween: 10
  });
  new Swiper(mainSliderElement, {
    spaceBetween: 10,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled',
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true,
    thumbs: {
      swiper: thumbnailsSwiper,
      slideThumbActiveClass: 'shop__thumbnails-slider-item--active'
    },
    breakpoints: {
      390: {
        slidesPerView: 'auto',
        spaceBetween: 10
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

function showAlert(_ref7) {
  let {
    heading,
    button = {},
    icon
  } = _ref7;
  const alert = new Alert({
    heading,
    button,
    icon
  });
  requestAnimationFrame(() => alert.open());
  return alert;
}

/* * * * * * * * * * * * * * * * * * * * * * * *
 * simple-filter-slider.js
 */
function showNotification(_ref8) {
  let {
    text,
    status
  } = _ref8;
  const notificationElement = createElementByString(`
    <dialog class="info-popup ${status && `info-popup--${status}`}">
      <p class="info-popup__text">${text}</p>
    </dialog>
  `);
  document.body.append(notificationElement);
  requestAnimationFrame(() => notificationElement.show());
  setTimeout(() => {
    notificationElement.close();
  }, 3000000000000);
  notificationElement.addEventListener('close', () => {
    setTimeout(() => {
      notificationElement.remove();
    }, MODAL_ANIMATION_DURATION);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * simple-filter-slider.js
 */
function initSimpleFilterSlider(sliderWrapperElement) {
  const sliderElement = sliderWrapperElement.querySelector('.simple-filter__slider');
  const prevButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--prev');
  const nextButtonElement = sliderWrapperElement.querySelector('.slider-arrows__button--next');
  new Swiper(sliderElement, {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
      prevEl: prevButtonElement,
      nextEl: nextButtonElement,
      disabledClass: 'slider-arrows__button--disabled-hidden',
      lockClass: 'slider-arrows__button--hidden'
    },
    grabCursor: true,
    breakpoints: {
      1280: {
        slidesPerView: 'auto',
        spaceBetween: 40
      },
      1600: {
        slidesPerView: 'auto',
        spaceBetween: 60
      }
    }
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
  const openSearchPanel = () => {
    headerElement.classList.add('site-header--search-open');
    lockPageScroll();
  };
  const closeSearchPanel = () => {
    headerElement.classList.remove('site-header--search-open');
    unlockPageScroll();
  };
  searchOpenerElements.forEach(openerElement => {
    openerElement.addEventListener('click', openSearchPanel);
  });
  searchCloserElements.forEach(closerElement => {
    closerElement.addEventListener('click', closeSearchPanel);
  });

  // Изменение цвета шапки при открытии меню на декстопной версии (нужно для главной страницы, где шапка transparent)
  const siteNavigationLinkOpenerElements = headerElement.querySelectorAll('.site-navigation__link--opener');
  siteNavigationLinkOpenerElements.forEach(openerElement => {
    openerElement.parentElement.addEventListener('mouseover', () => {
      if (laptopWidthMediaQueryList.matches) {
        headerElement.classList.add('site-header--menu-open');
      }
    });
  });
  siteNavigationLinkOpenerElements.forEach(openerElement => {
    openerElement.parentElement.addEventListener('mouseout', () => {
      if (laptopWidthMediaQueryList.matches) {
        headerElement.classList.remove('site-header--menu-open');
      }
    });
  });

  // Закрытие меню и панели поиска при ресайзе

  laptopWidthMediaQueryList.addEventListener('change', () => {
    closeBurgerMenu();
    closeSearchPanel();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * site-navigation-scrollbar.js
 */
function initSiteNavigation(navigationElement) {
  navigationElement.addEventListener('click', evt => {
    if (laptopWidthMediaQueryList.matches) {
      return;
    }
    const openerElement = evt.target.closest('.site-navigation__link--opener');
    if (!openerElement) {
      return;
    }
    evt.preventDefault();
    openerElement.classList.toggle('site-navigation__link--active');
  });

  // new SimpleBar(navigationElement, { autoHide: false })
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * size-chart.js
 */
function initSizeChart(sizeChartElement) {
  const tableWrapperElement = sizeChartElement.querySelector('div');
  new SimpleBar(tableWrapperElement, {
    autoHide: false
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * main.js
 */
const laptopWidthMediaQueryList = window.matchMedia(LAPTOP_WIDTH_MEDIA_QUERY);
const inputEvent = new Event('input', {
  bubbles: true
});
const changeEvent = new Event('change', {
  bubbles: true
});
const simpleBar = initPageScrollbar(document.querySelector('.page__scroll-wrapper'));
initSiteHeader(document.querySelector('.site-header'), simpleBar.getScrollElement());
initSiteNavigation(document.querySelector('.site-navigation'));
document.querySelectorAll('.article__photos').forEach(initArticlePhotos);
document.querySelectorAll('.article__seasons-slider-wrapper').forEach(initArticleSeasons);
document.querySelectorAll('.taber').forEach(taberElement => new Taber(taberElement));
document.querySelectorAll('.size-chart').forEach(initSizeChart);
document.querySelectorAll('.video').forEach(videoElement => new Video(videoElement));
document.querySelectorAll('.shop__slider-wrapper').forEach(initShopSlider);
document.querySelectorAll('.simple-filter__slider-wrapper').forEach(initSimpleFilterSlider);
document.querySelectorAll('.review__slider-wrapper').forEach(initReviewSlider);
document.querySelectorAll('.brands').forEach(initBrandsSlider);
document.querySelectorAll('.catalog-preview .products-slider').forEach(initCatalogPreviewSlider);
document.querySelectorAll('.search, .site-header__search').forEach(initSearch);
document.querySelectorAll('.folds').forEach(initFolds);
document.querySelectorAll('.products').forEach(initProducts);
document.querySelectorAll('.product').forEach(initProduct);
document.querySelectorAll('[data-modal="offer"]').forEach(modalElement => new Modal(modalElement));
document.querySelectorAll('[data-modal="size-chart"]').forEach(modalElement => new Modal(modalElement));
document.querySelectorAll('[data-modal="manager-contacts"]').forEach(modalElement => new Modal(modalElement));
document.querySelectorAll('.set').forEach(initSet);
document.querySelectorAll('.cart__form, .product__cart').forEach(initProductsCounters);
document.querySelectorAll('.catalog__sorting').forEach(initCatalogSorting);
document.querySelectorAll('.catalog').forEach(catalogElement => {
  initCatalogFilter(catalogElement, simpleBar.getScrollElement());
});
document.querySelectorAll('.select').forEach(initSelect);
document.querySelectorAll('.checkout-order__products').forEach(initCheckoutProductsSlider);
let subscriptionForm = null;
let subscriptionFormElement = document.querySelector('.subscription-form');
if (subscriptionFormElement) {
  subscriptionForm = new Form(subscriptionFormElement);
}
let reviews = null;
let reviewsElement = document.querySelector('.reviews');
if (reviewsElement) {
  reviews = new Reviews(reviewsElement);
}
let product = null;
let productElement = document.querySelector('.product');
if (productElement) {
  product = new Product(productElement);
}
let modalEntry = null;
const modalEntryElement = document.querySelector('[data-modal="entry"]');
if (modalEntryElement) {
  modalEntry = new ModalEntry(modalEntryElement);
}
let birthDateInfoModal = null;
const birthDateInfoModalElement = document.querySelector('[data-modal="birth-date-info"]');
if (birthDateInfoModalElement) {
  birthDateInfoModal = new Modal(birthDateInfoModalElement);
}
let birthDateModalForm = null;
const birthDateModalFormElement = document.querySelector('[data-modal="birth-date"]');
if (birthDateModalFormElement && birthDateInfoModal) {
  birthDateModalForm = new BirthDateModalForm(birthDateModalFormElement, birthDateInfoModal);
}
initReviewsIntroPhotos();
initConsumersPhotos();
/* * * * * * * * * * * * * * * * * * * * * * * */