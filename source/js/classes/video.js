/* * * * * * * * * * * * * * * * * * * * * * * *
 * video.js
 */
class Video {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.posterElement = videoElement.querySelector('.video__poster');
    this.playButtonWrapperElement = videoElement.querySelector('.video__play-button-wrapper');
    this.playButtonElement = videoElement.querySelector('.video__play-button');
    this.playerElement = videoElement.querySelector('.video__player');
    this.init();
  }

  play = () => {
    this.playerElement.play();
    this.playButtonWrapperElement.classList.add('video__play-button-wrapper--hidden');
    this.posterElement.classList.add('video__poster--hidden');
  };

  init() {
    this.playButtonElement.addEventListener('click', () => {
      this.play();
    });

    this.playerElement.addEventListener('ended', () => {
      this.playButtonWrapperElement.classList.remove('video__play-button-wrapper--hidden');
      this.posterElement.classList.remove('video__poster--hidden');
    });
  }
}
/* * * * * * * * * * * * * * * * * * * * * * * */
