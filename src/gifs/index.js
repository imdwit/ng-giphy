import angular from 'angular';

import gifsList from './gifsList.component';

const gifsModule = angular.module('app.gifs', []);

gifsModule.component('gifsList', gifsList);

export default gifsModule;
