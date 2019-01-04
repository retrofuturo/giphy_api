export default function ($stateProvider) {
  $stateProvider
    .state('imagesList', {
      url: '/images-list',
      component: 'imagesListComponent',
    })
    .state('otherwise', {
      url: '*path',
      component: 'imagesListComponent',
    });
}
