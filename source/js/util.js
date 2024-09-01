/* * * * * * * * * * * * * * * * * * * * * * * *
 * util.js
 */
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
