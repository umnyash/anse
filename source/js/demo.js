/* * * * * * * * * * * * * * * * * * * * * * * *
 * demo.js
 *
 * Здесь код для демонстрации фронтенда тестировщику и примера другим разработчикам.
 * Не подключайте этот файл к настоящему сайту.
/* * * * * * * * * * * * * * * * * * * * * * * */
console.log('Подключён временный файл для демонстрации.')

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Пример реализации повторной отправки формы в случае ошибки.
 * Функция-помошник.
 */
function initFormResending(form, alert) {
  // Добавление обработчика нажатия на кнопку
  alert.button.addEventListener('click', (evt) => {
    evt.preventDefault();

    // Подписка на начало попытки отправить форму (используется паттерн Издатель-Подписчик)
    form.addListener(FormEvents.SUBMIT_START, onFormSubmitStart);

    // Форма отправляется повторно
    form.formElement.requestSubmit();
  });

  function onFormSubmitStart() {
    console.log('Начата попытка отправить данные.');

    // Удаление подписчика, так как модальное окно с сообщение (alert) – "одноразовое":
    // Будет удалено, так как при завершении попытки отправки формы создаётся новое.
    form.removeListener(FormEvents.SUBMIT_START, onFormSubmitStart);

    // Подписка на завершение попытки отправить форму (используется паттерн Издатель-Подписчик)
    form.addListener(FormEvents.SUBMIT_END, onFormSubmitEnd);

    // Блокировка кнопки отправки
    alert.button.disabled = true;
    alert.button.classList.add('button--pending');
  };

  function onFormSubmitEnd() {
    console.log('Попытка отправить данные завершена.');

    // Удаление подписчика
    form.removeListener(FormEvents.SUBMIT_END, onFormSubmitEnd);

    // Закрытие модального окна с сообщением. При этом оно удалится из DOM.
    alert.close();
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */

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
