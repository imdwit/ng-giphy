import angular from 'angular';

import gifsList from './gifsList.component';
import myGif from './myGif.component';
const gifsModule = angular.module('app.gifs', []);

gifsModule.component('gifsList', gifsList);
gifsModule.component('myGif', myGif);
export default gifsModule;
