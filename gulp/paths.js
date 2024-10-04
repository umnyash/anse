const pathSrc = 'source';
const pathDest = 'build';

export default {
  root: pathDest,

  copyAssets: {
    src: [
      `${pathSrc}/img/**/*.webp`,
      `${pathSrc}/fonts/**/*.*`,
      `${pathSrc}/*.ico`,
      `${pathSrc}/*.webmanifest`,
      `${pathSrc}/vendor/**/*.*`,
      `${pathSrc}/files/*.*`,
    ],
    watch: [
      `${pathSrc}/img/**/*.webp`,
      `${pathSrc}/fonts/**/*.*`,
      `${pathSrc}/*.ico`,
      `${pathSrc}/*.webmanifest`,
    ],
    dest: pathDest,
    base: pathSrc
  },

  createVectorStack: {
    src: `${pathSrc}/img/icons/**/*.svg`,
    watch: `${pathSrc}/img/icons/**/*.svg`,
    dest: `${pathDest}/img`
  },

  createWebp: {
    src: `${pathSrc}/img/**/*.{png,jpg}`,
    watch: `${pathSrc}/img/**/*.{png,jpg}`,
    dest: `${pathDest}/img`
  },

  optimizeVector: {
    src: [
      `${pathSrc}/img/**/*.svg`,
      `!${pathSrc}/img/icons/**/*.svg`
    ],
    watch: [
      `${pathSrc}/img/**/*.svg`,
      `!${pathSrc}/img/icons/**/*.svg`
    ],
    dest: `${pathDest}/img`
  },

  processMarkup: {
    src: `${pathSrc}/pug/*.pug`,
    watch: `${pathSrc}/pug/**/*.pug`,
    dest: pathDest,
  },

  processScripts: {
    src: [
      `${pathSrc}/js/const.js`,
      `${pathSrc}/js/util.js`,
      `${pathSrc}/js/api/api.js`,
      `${pathSrc}/js/classes/pub-sub.js`,
      `${pathSrc}/js/classes/modal.js`,
      `${pathSrc}/js/classes/alert.js`,
      `${pathSrc}/js/classes/form-validator.js`,
      `${pathSrc}/js/classes/form.js`,
      `${pathSrc}/js/classes/modal-form.js`,
      `${pathSrc}/js/classes/modal-entry.js`,
      `${pathSrc}/js/classes/birth-date-modal-form.js`,
      `${pathSrc}/js/classes/checkout-form.js`,
      `${pathSrc}/js/classes/product.js`,
      `${pathSrc}/js/classes/cart.js`,
      `${pathSrc}/js/classes/taber.js`,
      `${pathSrc}/js/classes/reviews.js`,
      `${pathSrc}/js/classes/video.js`,
      `${pathSrc}/js/classes/catalog.js`,
      `${pathSrc}/js/modules/*.js`,
      `${pathSrc}/js/main.js`,
    ],
    watch: `${pathSrc}/js/**/*.js`,
    dest: `${pathDest}/js`
  },

  processDemoScript: {
    src: [
      `${pathSrc}/js/mock.js`,
      `${pathSrc}/js/demo.js`,
    ],
    watch: [
      `${pathSrc}/js/mock.js`,
      `${pathSrc}/js/demo.js`,
    ],
    dest: `${pathDest}/js`
  },

  processStyles: {
    src: `${pathSrc}/sass/*.scss`,
    watch: `${pathSrc}/sass/**/*.scss`,
    dest: `${pathDest}/css`
  },
};
