function initSkeleton() {
  document.querySelectorAll('.skeleton img').forEach((imgElement) => {
    if (imgElement.complete) {
      const skeletonElement = imgElement.closest('.skeleton');
      skeletonElement.classList.add('skeleton--loaded');
    } else {
      imgElement.addEventListener('load', () => {
        const skeletonElement = imgElement.closest('.skeleton');
        skeletonElement.classList.add('skeleton--loaded');
      });
    }
  });

  document.querySelectorAll('.skeleton video').forEach((videoElement) => {
    if (videoElement.readyState >= 1) {
      const skeletonElement = videoElement.closest('.skeleton');
      skeletonElement.classList.add('skeleton--loaded');
    } else {
      videoElement.addEventListener('loadeddata', () => {
        const skeletonElement = videoElement.closest('.skeleton');
        skeletonElement.classList.add('skeleton--loaded');
      });
    }
  });
};
