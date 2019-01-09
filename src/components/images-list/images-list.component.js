
class ImagesListController {
  static get $inject() {
    return ['GiphyApiService'];
  }
  constructor(GiphyApiService) {
    this.GiphyApiService = GiphyApiService;
    this.trendingGifs = {};
    this.searchGifs = {};
    this.collection = {};
    this.searchParams = '';
    this.searchPage = 1;
    this.page = 1;
    this.pageSize = 6;
    this.originalUrl = '';
    this.uploadTags = '';
    this.uploadSuccessfull = false;
    this.uploadDisabled = false;
    this.selectPage = this.selectPage.bind(this);
    this.search = this.search.bind(this);
  }
  $onInit() {
    this.getTrendingGifs();
    this.getCollection();
  }
  openOriginal(url) {
    const body = document.body;
    body.classList.add('no-overflow');
    this.originalUrl = url;
  }
  getTrendingGifs() {
    this.GiphyApiService.getTrendingGifs(this.pageSize).then((result) => this.trendingGifs = result);
  }
  selectPage(params) {
    this.page = params.page;
    const offset = (params.page - 1) * params.pageSize;
    this.GiphyApiService.getTrendingGifs(this.pageSize, offset).then((result) => this.trendingGifs = result);
  }
  search(paginationParams) {
    let offset = 0;
    const params = this.searchParams.split(' ').join('+');
    if (paginationParams && paginationParams.page > 1) {
      offset = (paginationParams.page - 1) * paginationParams.pageSize;
    }
    this.GiphyApiService.search(this.pageSize, params, offset).then((result) => this.searchGifs = result);
  }
  addGif(id) {
    this.GiphyApiService.addToCollection(id);
    this.getCollection();
  }
  deleteFromCollection(id) {
    this.GiphyApiService.deleteFromCollection(id);
    this.getCollection();
  }
  getCollection() {
    const ids = this.GiphyApiService.getCollectionIds();
    if (ids) {
      this.GiphyApiService.getCollection(ids).then((result) => {
        if (result) {
          this.collection = result;
        }
      });
    } else {
      this.collection = {};
    }
  }
  uploadGif() {
    this.uploadDisabled = true;
    const inputDOMNode = document.getElementById('imageUpload');
    this.GiphyApiService.uploadImage(inputDOMNode, this.uploadTags).then(() => {
      this.uploadSuccess();
      this.getCollection();
    }).catch((error) => {
      console.error(error);
    });
  }
  uploadSuccess() {
    this.uploadTags = '';
    this.uploadDisabled = false;
    this.uploadSuccessfull = true;
    setTimeout(() => {
      this.uploadSuccessfull = false;
    }, 1000);
  }
}

export default {
  controller: ImagesListController,
  template: require('./images-list.component.html'),
};
