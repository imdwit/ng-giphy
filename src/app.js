import 'angular-ui-router';
import gifsModule from './gifs';
import buttonGroupModule from './btnGroup';
import addBtnModule from './addBtn';
import servicesModule from './services';
import main from './main';

var app = angular.module('app', [
  'ui.router',
  'app.gifs',
  'app.buttonGroup',
  'app.addBtn',
  'app.services',
  'app.main'
]);
