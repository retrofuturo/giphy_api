
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
    this.getRandomGifs();
    this.getCollection();
  }
  getRandomGifs() {
    this.gifArray = this.GiphyApiService.getGifs();
  }
  searchGifs() {
    let params = this.searchParams.split(' ').join('+');
    console.log(params);
    this.searchArray = this.GiphyApiService.searchGifs(params);
  }
  addGif(index) {
    if (this.gifArray[index].collection) {
      this.GiphyApiService.addToCollection(this.gifArray[index].id);
    } else {
      this.GiphyApiService.deleteFromCollection(this.gifArray[index].id);
    }
  }
  getCollection() {
    let result = this.GiphyApiService.getCollectionArray();
    console.log(result);
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
