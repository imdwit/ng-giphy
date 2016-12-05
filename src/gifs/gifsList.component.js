import angular from 'angular';

var gifsList = {
  bindings: {
    gifs: '<',
  },
  require: {
   parent: '^^mainApp'
 },
 controller: function() {

   this.$onInit = function() {
     console.log(this.parent)
     this.filterBy = this.parent.filterBy;
   }
  //  this.filterBy = this.parent.filterBy;
   this.$onChanges = function(changes) {
     console.log(changes);
   };
 },
  template: `
    <div id="gifs">
      <div
        class="gif"
        ng-repeat="gif in $ctrl.gifs"
        ng-click="$ctrl.parent.toggleGif({gif: gif})">
          <img class="gif__img" ng-if="gif.playing" ng-src="{{gif.original}}" />
          <img class="gif__img" ng-if="!gif.playing" ng-src="{{ gif.still }}" />
          <p>Rating: {{gif.rating}}</p>
      </div>
    </div>
  `
};

export default gifsList;
