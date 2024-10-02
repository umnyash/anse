/* * * * * * * * * * * * * * * * * * * * * * * *
 * modal.js
 */
class Modal {
  constructor(modalElement, { onOpenerClick } = {}) {
    this.modalElement = modalElement;
    this.name = modalElement?.dataset.modal;
    this.initOpeners();
    this.modalElement.addEventListener('close', () => this.onModalClose());
    this.onOpenerClick = onOpenerClick;

    this.modalElement.addEventListener('click', (evt) => {
      if (evt.target === this.modalElement || evt.target.closest('[data-modal-close-button]') || !evt.target.closest('.modal__inner')) {
        evt.preventDefault();
        this.close();
      }
    })

    if (!document.body.contains(this.modalElement)) {
      document.body.append(this.modalElement)
    }
  }

  initOpener = (openerElement) => {
    openerElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (openerElement.dataset.modalOpener !== this.name) {
        return;
      }

      if (this.onOpenerClick) {
        this.onOpenerClick(evt);
      }

      this.open();
    });
  };

  initOpeners = () => {
    const openerElements = document.querySelectorAll(`[data-modal-opener="${this.name}"]`);

    openerElements.forEach(this.initOpener);
  }

  open = () => {
    this.modalElement.showModal();
  }

  close = () => {
    this.modalElement.close();
  }

  onModalClose = () => {
    setTimeout(() => {
      if (this.modalElement.classList.contains('modal--with_alert')) {
        this.modalElement.remove();
        this.modalElement = null;
      }
    }, MODAL_ANIMATION_DURATION);
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
