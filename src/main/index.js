import angular from 'angular';

import mainApp from './mainApp.component';
import routeConfig from './mainApp.config';

var main = angular.module('app.main', []);

main.component('mainApp', mainApp);
main.config(routeConfig);
export default main;
