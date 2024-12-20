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

    const isSizeSelected = product.checkSelectedSize();
    const isColorSelected = product.checkSelectedColor();

    if (isSizeSelected && isColorSelected) {
      product.setCounterValue(1);
      product.setAddedToCartView();
      product.showCartNotification();
    } else if (!isSizeSelected) {
      console.log('Размер не выбран.')
      product.openSizeModal();
    } else if (!isColorSelected) {
      console.log('Цвет не выбран.')
      product.openColorModal();
    }
  });

  product.sizeModalFormElement?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    product.closeSizeModal();
    product.setCounterValue(1);
    product.setAddedToCartView();
    product.showCartNotification();
  });

  product.colorModalFormElement?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    product.closeColorModal();
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

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление обработчиков для отправки формы оформления заказов
 */
if (checkoutForm) {
  checkoutForm.setHandlers(
    // Колбэк, вызываемый при успешной отправке данных
    (data) => { //
      console.log('Распарсенный ответ сервера:', data);

      window.location.href = 'https://umnyash.github.io/anse/checkout-success.html';
    },
    // Колбэк, вызываемый при ошибке отправки данных
    (data) => {
      console.log('Распарсенный ответ сервера:', data);

      window.location.href = 'https://umnyash.github.io/anse/checkout-error.html';
    }
  );

  const onRegionFormSubmitButtonClick = () => {
    const countryText = checkoutForm.getSelectedOption(checkoutForm.regionFormCountryFieldElement, checkoutForm.regionFormCountryOptionElements).textContent;
    const cityText = checkoutForm.regionFormCityFieldElement.value;

    const regionText = `${countryText}, ${cityText}`;

    checkoutForm.regionFieldElement.value = regionText;
    checkoutForm.regionFieldElement.dispatchEvent(inputEvent);
    checkoutForm.deliveryCompanyButtonsWrapper.classList.remove('checkout-form__delivery-company--hidden');
    checkoutForm.regionModal.close();
  };

  checkoutForm.regionFormSubmitButtonElement.addEventListener('click', onRegionFormSubmitButtonClick);
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Отображение списка вариантов при вводе адреса.
 */

document.querySelectorAll('.text-field').forEach((fieldElement) => {
  const dataListElement = fieldElement.querySelector('.text-field__data-list');

  if (!dataListElement) {
    return;
  }

  const controlElement = fieldElement.querySelector('.text-field__control');

  controlElement.addEventListener('focus', () => {
    fieldElement.classList.add('text-field--list-open');
  });

  dataListElement.addEventListener('click', (evt) => {
    const itemText = evt.target.textContent;
    controlElement.value = itemText;
    fieldElement.classList.remove('text-field--list-open');
  });
});

/* * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление отзывов
 */
if (reviews) {
  const showMoreButton = document.querySelector('.reviews-list__button');

  showMoreButton.addEventListener('click', () => {
    reviews.renderReviews(mockReviews);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление товаров в каталоге
 */
if (catalog) {
  const showMoreButton = document.querySelector('.catalog__more-button-wrapper .button');

  showMoreButton.addEventListener('click', () => {
    catalog.renderProducts(mockProducts);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление фотографий знаменитостей
 */
if (celebrities) {
  const showMoreButton = document.querySelector('.celebrities-list__button');

  showMoreButton.addEventListener('click', () => {
    celebrities.renderCelebrities(mockCelebrities);
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * *
 * Добавление обработчиков сохранения формы профиля
 */
if (profileForm) {
  profileForm.setHandlers(
    (data) => { //
      console.log('Распарсенный ответ сервера:', data);

      showNotification({
        text: 'Данные профиля<br> успешно сохранены',
        status: 'success'
      });
    },

    (data) => {
      console.log('Распарсенный ответ сервера:', data);

      const alert = showAlert({
        heading: 'Не удалось сохранить данные',
        button: {
          text: 'Попробовать еще раз'
        }
      });

      initFormResending(profileForm, alert);
    }
  );
}
/* * * * * * * * * * * * * * * * * * * * * * * */
