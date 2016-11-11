import angular from 'angular';
var addBtn = {
  bindings: {
    handleKeyUp: '&',
  },
  template: `
    <input ng-model="$ctrl.topic" ng-keyup="$ctrl._handleKeyUp($event)" />
  `,
  controller: function() {
    this.$onInit = function() {
      this.topic = '';
    };

    this._handleKeyUp = function(e) {
      if (e.which === 13) {
        this.handleKeyUp({$event: {topic: this.topic}});
        this.topic = '';
      }
    }
  }
};

const addBtnModule = angular.module('app.addBtn', []);

addBtnModule.component('addBtn', addBtn);

export default addBtnModule;
