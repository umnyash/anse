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

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttleAndDebounce(func, wait) {
  let lastTime = 0;
  let timeout;

  return function (...args) {
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

function getPaginationButtonCreator(slideName = 'Слайд') {
  return (index, className) => `
    <button class='${className}' type='button'>
      <span class='visually-hidden'>${slideName} ${index + 1}.</span>
    </button>
  `;
}

function initFormResending(form, alert) {
  alert.button.addEventListener('click', (evt) => {
    evt.preventDefault();

    form.addListener(FormEvents.SUBMIT_START, onFormSubmitStart);
    form.formElement.requestSubmit();
  });

  function onFormSubmitStart() {
    form.removeListener(FormEvents.SUBMIT_START, onFormSubmitStart);

    form.addListener(FormEvents.SUBMIT_END, onFormSubmitEnd);

    alert.button.disabled = true;
    alert.button.classList.add('button--pending');
  };

  function onFormSubmitEnd() {
    form.removeListener(FormEvents.SUBMIT_END, onFormSubmitEnd);
    alert.close();
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
