
export default class GiphyApiService {
  static get $inject() {
    return ['$http'];
  }
  constructor($http) {
    this.$http = $http;
    this.gifs = {};
    this.randomGif = '';
    this.baseUrl = 'http://api.giphy.com';
    this.trendingPath = '/v1/gifs/trending';
    this.searchPath = '/v1/gifs/search';
    this.findPath = '/v1/gifs';
    this.apiKey = 'MHJ6eAyCOWfljhEUWi4Mr9wdIDCgA1mj';
    this.collection = [];
    this.gifLimit = 6;
  }
  getTrendingGifs() {
    const result = this.$http.get(`${this.baseUrl}${this.trendingPath}?api_key=${this.apiKey}&limit=${this.gifLimit}&offset=3`);
    const gifArray = this.addGifArray(result);

    return gifArray;
  }
  addGifArray(result) {
    const gifArray = [];
    result.then((gifs) => {
      console.log(gifs);
      gifs.data.data.forEach((gif) => {
        const gifObj = {};
        gifObj.downsizedUrl = gif.images.fixed_height.url;
        gifObj.id = gif.id;
        gifObj.username = gif.username;
        gifObj.rating = gif.rating;
        gifObj.import_datetime = gif.import_datetime;
        gifObj.type = gif.type;
        gifObj.collection = false;
        gifArray.push(gifObj);
      });
    });
    return gifArray;
  }
  searchGifs(searchParams) {
    const result = this.$http.get(`${this.baseUrl}${this.searchPath}?q=${searchParams}&api_key=${this.apiKey}&limit=5&offset=5`);
    const gifArray = this.addGifArray(result);
    return gifArray;
  }
  getCollectionArray() {
    const ids = JSON.parse(localStorage.getItem('collection')).join(',');
    console.log(ids);
    const result = this.$http.get(`${this.baseUrl}${this.findPath}?api_key=${this.apiKey}&ids=${ids}`);
    const gifArray = this.addGifArray(result);
    return gifArray;
  }
  addToCollection(id) {
    this.collection = JSON.parse(localStorage.getItem('collection'));
    this.collection.push(id);
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }
  deleteFromCollection(id) {
    this.collection = JSON.parse(localStorage.getItem('collection'));
    this.collection.forEach((item, i) => {
      if (item === id) {
        this.collection.splice(i, 1);
        localStorage.setItem('collection', JSON.stringify(this.collection));
      }
    });
  }
  uploadImage(inputDOMNode) {
    const form = new FormData();
    form.append('api_key', this.apiKey);
    form.append('file', inputDOMNode.files[0], inputDOMNode.files[0].name);
    console.log(form);
    const config = {
      headers: {
        'Content-type': undefined,
      },
    };
    this.$http.post('http://upload.giphy.com/v1/gifs', form, config).then((result) => {
      console.log(result);
    });
  }
}
