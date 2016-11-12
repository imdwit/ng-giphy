import angular from 'angular';

var gifsList = {
  bindings: {
    gifs: '<',
    handleClick: '&',
    filterBy: '<',
  },
  template: `
    <div id="gifs">
      <div
        class="gif"
        ng-repeat="gif in $ctrl.gifs | filter:$ctrl.filterBy"
        ng-click="$ctrl.handleClick({$event: {gif: gif}})">
          <img class="gif__img" ng-if="gif.playing" ng-src="{{gif.original}}" />
          <img class="gif__img" ng-if="!gif.playing" ng-src="{{ gif.still }}" />
          <p>Rating: {{gif.rating}}</p>
      </div>
    </div>
  `
};

const gifsModule = angular.module('app.gifs', []);

gifsModule.component('gifsList', gifsList);

export default gifsModule;
