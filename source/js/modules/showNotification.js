/* * * * * * * * * * * * * * * * * * * * * * * *
 * simple-filter-slider.js
 */
function showNotification({ text, status }) {
  const notificationElement = createElementByString(`
    <dialog class="info-popup ${status && `info-popup--${status}`}">
      <p class="info-popup__text">${text}</p>
    </dialog>
  `);

  document.body.append(notificationElement);
  requestAnimationFrame(() => notificationElement.show());

  setTimeout(() => {
    notificationElement.close();
  }, 3000);

  notificationElement.addEventListener('close', () => {
    setTimeout(() => {
      notificationElement.remove();
    }, MODAL_ANIMATION_DURATION);
  })
}
/* * * * * * * * * * * * * * * * * * * * * * * */
