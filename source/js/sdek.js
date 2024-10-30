'use strict';
const mapWrapperElement = document.querySelector('.modal-sdek--style_sdek .modal-sdek__map');
const sdekInfoElement = mapWrapperElement.querySelector('#SDEK_info');
const sdekSignElement = mapWrapperElement.querySelector('#SDEK_sign');

sdekSignElement.addEventListener('click', () => {
  if (sdekInfoElement.classList.contains('closed')) {
    sdekInfoElement.classList.remove('closed');
  } else {
    sdekInfoElement.classList.add('closed');
  }
});
