
export default class GiphyConfig() {
  static get $inject() {
    return ['giphyConfigProvider'];
  }
  runConfig(giphyConfigProvider) {
    giphyConfigProvider.setKey('MHJ6eAyCOWfljhEUWi4Mr9wdIDCgA1mj');
  }
}
