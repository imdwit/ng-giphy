var mainApp = {
  template: `
    <div>
      <p>add a topic:</p>
      <input
        ng-model="$ctrl.topic"
        ng-keyup="$ctrl.addTopic($event)"  />
      <div class="btn-group">
        <a class="btn-group__btn"
          ng-repeat="topic in $ctrl.topics track by $index"
          ui-sref="app.gifs({topic: topic})"
          >{{topic}}
        </a>
        
      </div>
      <div>
        <div ui-view>
        </div>
      </div>
    </div>
  `,
  controller: App,
};

function App() {
  this.$onInit = function() {
    this.topic = 'foo';
    this.topics = [
      'miata',
      'rx7',
      'gtr',
      'corvette',
      'mustang',
      'civic',
    ];
  };

  this.addTopic = function(e) {
    if (e.which == 13) {
      this.topics.push(this.topic);
    }
  };

  this.toggleGif = function($event) {
    var gif = $event.gif;
    console.log(gif);
    gif.playing = !gif.playing;
  }

}

export default mainApp;