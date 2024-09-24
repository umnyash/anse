/* * * * * * * * * * * * * * * * * * * * * * * *
 * alert.js
 */
class Alert extends Modal {
  constructor({ heading, button, icon }) {
    const modalElement = Alert.createElement({ heading, button, icon });
    document.body.append(modalElement);
    super(modalElement);
    this.button = modalElement.querySelector('.alert__button');
  }

  static createElement({ heading, button, icon }) {
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
