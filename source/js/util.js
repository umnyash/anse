/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
function lockPageScroll() {
  const bodyWidth = document.body.clientWidth;
  document.body.classList.add('scroll-lock');

  if (document.body.clientWidth === bodyWidth) {
    return;
  }

  document.body.style.paddingRight = `${document.body.clientWidth - bodyWidth}px`;
}

function unlockPageScroll() {
  document.body.classList.remove('scroll-lock');
  document.body.style.paddingRight = '0';
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
/* * * * * * * * * * * * * * * * * * * * * * * */
