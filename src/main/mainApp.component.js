var mainApp = {
  template: `
    <div>
      <p>add a topic: </p>
      <add-btn
        handle-key-up="$ctrl.addBtn($event)">
      </add-btn>
      <button-group
        topics="$ctrl.topics">
      </button-group>
      <div ui-view>
        Pick a topic!
      </div>
    </div>
  `,
  controller: App
};

App.$inject = ['GifsService', '$http'];
// injects our dependencies
// needed for minification
/* <gifs-list
  gifs="$ctrl.gifs"
  handle-click="$ctrl.toggleGif($event)"
  filter-by="$ctrl.filterBy"
  >
  */
function App(GifsService, $http, $window) {
  // $ctrl in our template refers to `this`;
  this.$onInit = function() {
    this.topics = JSON.parse(localStorage.getItem('topics')) || [
      'miata',
      'rx7',
      'gtr',
      'corvette',
      'mustang',
    ];

    this.gifs = [];
    12600000
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
    localStorage.setItem('topics', JSON.stringify(this.topics))
  }
}

export default mainApp;
