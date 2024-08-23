/* * * * * * * * * * * * * * * * * * * * * * * *
 * article-photos.js
 */
let activeButtonElement = null;

function onDocumentClickWhileArticlePhotosButtonExpanded(evt) {
  const captionButtonElement = evt.target.closest('.article__photos button');

  if (!captionButtonElement && activeButtonElement) {
    activeButtonElement.ariaExpanded = 'false';
    activeButtonElement = null;
  }

  document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
}

function initArticlePhotos(photosElement) {
  photosElement.addEventListener('click', (evt) => {
    const captionButtonElement = evt.target.closest('.article__photos button');

    if (!captionButtonElement) {
      return;
    }

    if (activeButtonElement && activeButtonElement !== captionButtonElement) {
      activeButtonElement.ariaExpanded = 'false';
    }

    const isExpanded = captionButtonElement.ariaExpanded === 'true';

    if (isExpanded) {
      captionButtonElement.ariaExpanded = 'false';
      activeButtonElement = null;
      document.removeEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    } else {
      captionButtonElement.ariaExpanded = 'true';
      activeButtonElement = captionButtonElement;
      document.addEventListener('click', onDocumentClickWhileArticlePhotosButtonExpanded);
    }

    evt.stopPropagation();
  });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
