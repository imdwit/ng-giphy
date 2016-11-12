import angular from 'angular';

import gifsModule from './gifs';
import buttonGroupModule from './btnGroup';
import addBtn from './addBtn';
import servicesModule from './services';

var app = angular.module('app', [
  'app.gifs',
  'app.buttonGroup',
  'app.addBtn',
  'app.services',
]);

var mainApp = {
  template: `
    <div>
      <p>Filter by rating: </p>
      <input ng-model="$ctrl.filterBy" />
      <p>add a topic: </p>
      <add-btn
        handle-key-up="$ctrl.addBtn($event)">
      </add-btn>
      <button-group
        topics="$ctrl.topics"
        handle-click="$ctrl.fetchGifs($event)">
      </button-group>
      <gifs-list
        gifs="$ctrl.gifs"
        handle-click="$ctrl.toggleGif($event)"
        filter-by="$ctrl.filterBy"
        >
      </gifs-list>
    </div>
  `,
  controller: App
};

App.$inject = ['GifsService', '$http'];
// injects our dependencies
// needed for minification
function App(GifsService, $http) {
  // $ctrl in our template refers to `this`;
  this.$onInit = function() {
    this.topics = [
      'miata',
      'rx7',
      'gtr',
      'corvette',
      'mustang',
    ];

    this.gifs = [];

    this.filterBy = '';
  };

  this.fetchGifs = function($event) {
    console.log($event)
    var topic = $event.topic;
    GifsService.fetch(topic)
    .then(res => {
      return res.data.data.map(gif => {
        var original = gif.images.original.url;
        var still = gif.images.original_still.url;
        var rating = gif.rating;
        var playing = false;
        return { original, still, playing, rating };
      });
    })
    .then(gifs => {
      console.log('g', gifs);
      this.gifs = gifs;
    });
  };

  this.toggleGif = function($event) {
    console.log($event);
    var gif = $event.gif;
    gif.playing = !gif.playing;
  };


  this.addBtn = function($event) {
    console.log($event);
    this.topics.push($event.topic);
  }
}

app.component('mainApp', mainApp);
