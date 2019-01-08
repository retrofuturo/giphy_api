
class ImagesListController {
  static get $inject() {
    return ['GiphyApiService'];
  }
  constructor(GiphyApiService) {
    this.GiphyApiService = GiphyApiService;
    this.gifs = {};
    this.gifArray = [];
    this.searchArray = [];
    this.collectionArray = [];
    this.searchParams = '';
  }
  $onInit() {
    this.getTrendingGifs();
    this.getCollection();
  }
  getTrendingGifs() {
    this.gifArray = this.GiphyApiService.getTrendingGifs();
  }
  searchGifs() {
    const params = this.searchParams.split(' ').join('+');
    console.log(params);
    this.searchArray = this.GiphyApiService.searchGifs(params);
  }
  addGif(index) {
    if (this.gifArray[index].collection) {
      this.GiphyApiService.addToCollection(this.gifArray[index].id);
      this.getCollection();
    } else {
      this.GiphyApiService.deleteFromCollection(this.gifArray[index].id);
      this.getCollection();
    }
  }
  getCollection() {
    this.collectionArray = this.GiphyApiService.getCollectionArray();
  }
  uploadGif() {
    const inputDOMNode = document.getElementById('imageUpload');
    this.GiphyApiService.uploadImage(inputDOMNode);
  }
}

export default {
  controller: ImagesListController,
  template: require('./images-list.component.html'),
};
