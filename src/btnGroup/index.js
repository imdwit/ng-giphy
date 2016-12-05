import angular from 'angular';

import buttonGroup from './buttonGroup.component';

const buttonGroupModule = angular.module('app.buttonGroup', []);

buttonGroupModule.component('buttonGroup', buttonGroup);

export default buttonGroupModule;
