import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from '@uirouter/angularjs';
import materialIcon from 'angular-material-icons';
import ngAnimate from 'angular-animate';
import ngGiphy from 'ng-giphy';

import 'angular/angular-csp.css';
import 'angular-material/angular-material.css';
import './index.scss';

import AppComponent from './app.component';
import ImagesListComponent from './components/images-list/images-list.component';
import OriginalImageComponent from './components/original-image/original-image.component';
import GiphyApiService from './services/giphy-api.service';
import PagingDirective from './directives/PagingDirective';

import routes from './index.route';

angular.module('main', [
  ngMaterial,
  uiRouter,
  materialIcon,
  ngAnimate,
  ngGiphy,
])
  .component('app', AppComponent)
  .component('imagesListComponent', ImagesListComponent)
  .component('originalImage', OriginalImageComponent)
  .service('GiphyApiService', GiphyApiService)
  .directive('pagination', PagingDirective)
  .config(['$stateProvider', routes])
  .run();
