class OriginalImageController {
  constructor() {
    this.url = '';
  }

  close() {
    const body = document.body;
    body.classList.remove('no-overflow');
    this.url = '';
  }
}

export default {
  bindings: {
    url: '=',
  },
  controller: OriginalImageController,
  template: require('./original-image.component.html'),
};
