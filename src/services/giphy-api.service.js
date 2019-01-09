
export default class GiphyApiService {
  static get $inject() {
    return ['$http'];
  }
  constructor($http) {
    this.$http = $http;
    this.baseUrl = 'http://api.giphy.com';
    this.trendingPath = '/v1/gifs/trending';
    this.searchPath = '/v1/gifs/search';
    this.findPath = '/v1/gifs';
    this.apiKey = 'MHJ6eAyCOWfljhEUWi4Mr9wdIDCgA1mj';
    this.collection = [];
    this.pageSize = 6;
  }
  getTrendingGifs(limit, offset = 0) {
    return this.$http.get(`${this.baseUrl}${this.trendingPath}?api_key=${this.apiKey}&limit=${limit}&offset=${offset}`)
                     .then(response => this.addGifs(response));
  }

  addGifs(gifs) {
    const gifsObject = {
      gifsCount: 0,
      gifArray: [],
    };
    gifsObject.gifsCount = gifs.data.pagination.total_count;
    gifs.data.data.forEach((gif) => {
      const gifObj = {};
      gifObj.downsizedUrl = gif.images.fixed_height.url;
      gifObj.originalUrl = gif.images.original.url;
      gifObj.id = gif.id;
      gifObj.username = gif.username;
      gifObj.rating = gif.rating;
      gifObj.import_datetime = gif.import_datetime;
      gifObj.type = gif.type;
      gifObj.collection = false;
      gifsObject.gifArray.push(gifObj);
    });
    return gifsObject;
  }
  search(limit, searchParams, offset) {
    return this.$http.get(`${this.baseUrl}${this.searchPath}?q=${searchParams}&api_key=${this.apiKey}&limit=${limit}&offset=${offset}`)
                      .then(response => this.addGifs(response));
  }
  getCollectionIds() {
    const ids = JSON.parse(localStorage.getItem('collection'));
    if (ids) {
      return ids.join(',');
    } else {
      return null;
    }
  }
  getCollection(ids) {
    return this.$http.get(`${this.baseUrl}${this.findPath}?api_key=${this.apiKey}&ids=${ids}`)
                 .then(response => this.addGifs(response));
  }
  addToCollection(id) {
    const collection = JSON.parse(localStorage.getItem('collection'));
    if (collection) {
      this.collection = collection;
    }
    this.collection.push(id);
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }
  deleteFromCollection(id) {
    const collection = JSON.parse(localStorage.getItem('collection'));
    if (collection) {
      this.collection = collection;
    }
    this.collection.forEach((item, i) => {
      if (item === id) {
        this.collection.splice(i, 1);
        localStorage.setItem('collection', JSON.stringify(this.collection));
      }
    });
  }
  uploadImage(inputDOMNode, uploadTags) {
    const tags = uploadTags.split(' ').join(',');
    const form = new FormData();
    form.append('api_key', this.apiKey);
    form.append('file', inputDOMNode.files[0], inputDOMNode.files[0].name);
    form.append('tags', tags);
    const config = {
      headers: {
        'Content-type': undefined,
      },
    };
    return this.$http.post('http://upload.giphy.com/v1/gifs', form, config).then((result) => {
      this.addToCollection(result.data.data.id);
    });
  }
}
