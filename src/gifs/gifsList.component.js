var gifsList = {
  bindings: {
    gifs: '<',
  },
  require: {
    parent: '^^mainApp',
  },
  template: `
    <div id="gifs">
      <div
        class="gif"
        ng-repeat="gif in $ctrl.gifs track by $index"
        ng-click="$ctrl.parent.toggleGif({gif: gif})"
        >
        <img class="gif__img" ng-if="gif.playing" ng-src="{{gif.original}}" />
        <img class="gif__img" ng-if="!gif.playing" ng-src="{{gif.still}}" />
        <p>Rating: {{gif.rating}}</p>
      </div>
    </div>
  `
};

export default gifsList;