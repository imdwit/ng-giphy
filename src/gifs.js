import angular from 'angular';
var gifsList = {
  bindings: {
    gifs: '<',
    handleClick: '&',
  },
  template: `
    <div id="gifs">
      <div
        class="gif"
        ng-repeat="gif in $ctrl.gifs track by $index"
        ng-click="$ctrl.handleClick({$event: {gif: gif}})">
          <img class="gif__img" ng-if="gif.playing" ng-src="{{gif.original}}" />
          <img class="gif__img" ng-if="!gif.playing" ng-src="{{ gif.still }}" />
      </div>
    </div>
  `
};

const gifsModule = angular.module('app.gifs', []);

gifsModule.component('gifsList', gifsList);

export default gifsModule;
