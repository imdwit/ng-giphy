import angular from 'angular';

import gifsModule from './gifs';
import buttonGroupModule from './btnGroup';
import addBtn from './addBtn';

var app = angular.module('app', [
  'app.gifs',
  'app.buttonGroup',
  'app.addBtn',
]);

var mainApp = {
  template: `
    <div>
      <add-btn
        handle-key-up="$ctrl.addBtn($event)">
      </add-btn>
      <button-group
        topics="$ctrl.topics"
        handle-click="$ctrl.fetchGifs($event)">
      </button-group>
      <gifs-list
        gifs="$ctrl.gifs"
        handle-click="$ctrl.toggleGif($event)">
      </gifs-list>
    </div>
  `,
  controller: function($http) {
    var key = 'dc6zaTOxFJmzC';
    var giphy = 'http://api.giphy.com/v1/gifs/search';

    this.$onInit = function() {
      this.topics = [
        'miata',
        'rx7',
        'gtr',
        'corvette',
        'mustang',
      ];

      this.gifs = [];
    };

    this.fetchGifs = function($event) {
      console.log($event)
      var topic = $event.topic;
      $http({
        method: 'GET',
        url: giphy,
        params: {
          api_key: key,
          q: topic,
        },
      })
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
};

app.component('mainApp', mainApp);
