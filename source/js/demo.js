/* * * * * * * * * * * * * * * * * * * * * * * *
 * demo.js
 *
 * Здесь код для демонстрации фронтенда тестировщику и примера другим разработчикам.
 * Не подключайте этот файл к настоящему сайту.
/* * * * * * * * * * * * * * * * * * * * * * * */
console.log('Подключён временный файл для демонстрации.')

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление обработчиков в форме "Подписаться на рассылку"
 */
if (subscriptionForm) {
  subscriptionForm.setHandlers(
    // Колбэк, вызываемый при успешной отправке данных
    (data) => { //
      console.log('Распарсенный ответ сервера:', data);

      showAlert({
        heading: 'Спасибо за подписку',
        icon: true
      });
    },
    // Колбэк, вызываемый при ошибке отправки данных
    (data) => {
      console.log('Распарсенный ответ сервера:', data);

      const alert = showAlert({
        heading: 'Не получилось оформить подписку',
        button: {
          text: 'Попробовать еще раз'
        }
      });

      initFormResending(subscriptionForm, alert);
    }
  );
}
/* * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * *
 * Имитация добавления обработчиков на страницу продукта
 */
if (product) {
  product.formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = product.checkSelectedSize();

    if (isValid) {
      product.setCounterValue(1);
      product.setAddedToCartView();
      product.showCartNotification();
    } else {
      console.log('Размер не выбран.')
      product.openSizeModal();
    }
  });

  product.sizeModalFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    product.closeSizeModal();
    product.setCounterValue(1);
    product.setAddedToCartView();
    product.showCartNotification();
  });

  product.counterElement.addEventListener('input', (evt) => {
    const value = +evt.target.value;

    if (value === 0) {
      product.setDefaultView();
    }
  })
}
/* * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление обработчиков в форме авторизации
 */
if (modalEntry) {
  modalEntry.codeFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = modalEntry.validatePhoneField();

    if (isValid) {
      modalEntry.switchStep(2);
    } else {
      modalEntry.showCodeFormErrorMessage();
    }
  });

  modalEntry.loginFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    window.location.href = 'https://umnyash.github.io/anse/account.html';
  })
}
/* * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * *
 * Выход из личного кабинета
 */
const logoutButtonElement = document.querySelector('.account-menu__logout-button');

if (logoutButtonElement) {
  logoutButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    showAlert({
      heading: 'Вы уверены, что хотите выйти из личного кабинета?',
      button: {
        text: 'Выйти',
        classes: 'jsLogoutUser'
      }
    });
  });
}

/* * * * * * * * * * * * * * * * * * * * * * * */
