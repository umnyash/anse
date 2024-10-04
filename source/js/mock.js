const mockReviews = [
  {
    author: 'Оксана Туманина',
    text: 'Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи.',
    photos: [
      'img/consumers/consumer-7.webp',
    ],
    date: '2024-08-31',
  },
  {
    author: 'Оксана Туманова',
    text: 'Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи шубка застегиваеться на пуговицу тем самым плотно сидит и думаю не будет дуть холодным ветром. Рукава сшиты у данной модели с утяжкой тем самым не давая холоду попасть в рукав очень удобно продумано. Хочу выразить благодарность всей команде Ансе. Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи шубка застегиваеться на пуговицу тем самым плотно сидит и думаю не будет дуть холодным ветром. Рукава сшиты у данной модели с утяжкой тем самым не давая холоду попасть в рукав очень удобно продумано. Хочу выразить благодарность всей команде Ансе.',
    photos: [
      'img/consumers/consumer-7.webp',
      'img/consumers/consumer-7.webp',
      'img/consumers/consumer-7.webp',
    ],
    date: '2024-09-01'
  },
  {
    author: 'Оксана Туман',
    text: 'Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи шубка застегиваеться на пуговицу тем самым плотно сидит и думаю не будет дуть холодным ветром. Рукава сшиты у данной модели с утяжкой тем самым не давая холоду попасть в рукав очень удобно продумано. Хочу выразить благодарность всей команде Ансе. Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло.',
    photos: [
      'img/consumers/consumer-7.webp',
      'img/consumers/consumer-7.webp',
    ],
    date: '2024-09-24'
  },
  {
    author: 'Оксана Туманенко',
    text: 'Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи.',
    photos: [
      'img/consumers/consumer-1.webp',
      'img/consumers/consumer-2.webp',
      'img/consumers/consumer-3.webp',
      'img/consumers/consumer-4.webp',
    ],
    date: '2024-09-28'
  },
  {
    author: 'Оксана Туманович',
    text: 'Добрый день. Получила свою шубку. Приехала за 6 дней из Питера в Ижевск. Всё по размеру подошло. Очень понравился капюшон он идеально сидит на голове в районе шеи.',
    photos: [
      'img/consumers/consumer-1.webp',
      'img/consumers/consumer-2.webp',
      'img/consumers/consumer-3.webp',
      'img/consumers/consumer-4.webp',
      'img/consumers/consumer-5.webp',
      'img/consumers/consumer-6.webp',
    ],
    date: '2024-10-03'
  },
];

const mockProducts = [
  {
    title: 'Шуба SETTE BLACK',
    image: 'img/products/product-1.webp',
    image2: 'img/products/product-additional.webp',
    link: 'product-with-sizes.html',
    price: '8 980',
    oldPrice: '8 980',
    installments: '6 995',
    sizes: [
      {
        title: 'xxs',
        disabled: true
      },
      {
        title: 'xs'
      },
      {
        title: 's',
      },
      {
        title: 'm'
      },
      {
        title: 'l',
        disabled: true
      },
      {
        title: 'xl'
      },
    ],
  },
  {
    title: 'Шуба SETTE BLACK',
    image: 'img/products/product-2.webp',
    image2: 'img/products/product-3.webp',
    link: 'product-with-sizes.html',
    new: true,
    price: '8 980',
    oldPrice: '8 980',
    sizes: [
      {
        title: 'xxs',
        disabled: true
      },
      {
        title: 'xs'
      },
      {
        title: 's',
      },
      {
        title: 'm'
      },
      {
        title: 'l',
        disabled: true
      },
      {
        title: 'xl'
      },
    ]
  },
  {
    title: 'Шуба SETTE BLACK с длинным названием',
    image: 'img/products/product-3.webp',
    image2: 'img/products/product-additional.webp',
    link: 'product-with-colors.html',
    sale: true,
    price: '8 980',
    installments: '6 995',
    colors: [
      {
        title: 'Цвет 6',
        src: 'img/colors/6.webp',
        disabled: true
      },
      {
        title: 'Цвет 6',
        src: 'img/colors/6.webp',
        disabled: true
      },
      {
        title: 'Розовый фламинго',
        src: 'img/colors/pink-flamingo.webp',
      },
      {
        title: 'Цвет 1',
        src: 'img/colors/1.webp'
      },
      {
        title: 'Цвет 2',
        src: 'img/colors/2.webp'
      },
      {
        title: 'Цвет 3',
        src: 'img/colors/3.webp',
        disabled: true
      },
      {
        title: 'Цвет 4',
        src: 'img/colors/4.webp'
      },
      {
        title: 'Цвет 1',
        src: 'img/colors/1.webp'
      },
      {
        title: 'Цвет 2',
        src: 'img/colors/2.webp'
      },
      {
        title: 'Цвет 5',
        src: 'img/colors/5.webp'
      },
      {
        title: 'Цвет 1',
        src: 'img/colors/1.webp'
      }
    ]
  },
  {
    title: 'Шуба SETTE BLACK',
    image: 'img/products/product-4.webp',
    image2: 'img/products/product-additional.webp',
    link: 'product-with-colors.html',
    sale: true,
    new: true,
    price: '8 980', // [6, 6, 'pink-flamingo', 1, 2, 3, 4, 5, 1]
    colors: [
      {
        title: 'Цвет 6',
        src: 'img/colors/6.webp'
      },
      {
        title: 'Цвет 6',
        src: 'img/colors/6.webp'
      },
      {
        title: 'Розовый фламинго',
        src: 'img/colors/pink-flamingo.webp',
        disabled: true
      },
      {
        title: 'Цвет 1',
        src: 'img/colors/1.webp'
      },
      {
        title: 'Цвет 2',
        src: 'img/colors/2.webp'
      },
      {
        title: 'Цвет 3',
        src: 'img/colors/3.webp',
        disabled: true
      },
      {
        title: 'Цвет 4',
        src: 'img/colors/4.webp'
      },
      {
        title: 'Цвет 5',
        src: 'img/colors/5.webp'
      },
      {
        title: 'Цвет 1',
        src: 'img/colors/1.webp'
      }
    ]
  },
];

const mockCelebrities = [
  {
    title: 'Родиана Новикова',
    image: 'img/celebrities/rodiana-novikova.webp',
  },
  {
    title: 'Екатерина Ратундалова',
    image: 'img/celebrities/ekaterina-ratundalova.webp',
  },
  {
    title: 'Виктория Дайнеко',
    image: 'img/celebrities/viktoriya-dayneko.webp',
  },
];
