import angular from 'angular';

var buttonGroup = {
  bindings: {
    topics: '<',
    handleClick: '&',
  },
  template: `
    <div id="buttons">
      <button
        ng-repeat="topic in $ctrl.topics track by $index"
        ng-click="$ctrl.handleClick({$event: {topic: topic}})">
        {{topic}}
      </button>
    </div>
  `
};

const buttonGroupModule = angular.module('app.buttonGroup', []);

buttonGroupModule.component('buttonGroup', buttonGroup);

export default buttonGroupModule;
