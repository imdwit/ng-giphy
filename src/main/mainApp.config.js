export default function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/',
      component: 'mainApp',
    })
    .state('app.gifs', {
      url: 'gifs/:topic',
      component: 'gifsList',
      resolve: {
        gifs: function($stateParams, GifsService) {
          var topic = $stateParams.topic;
          return GifsService.fetch(topic)
          .then(res => {
            const gifs = res.data.data.map(gif => {
              var original = gif.images.original.url;
              var still = gif.images.original_still.url;
              var rating = gif.rating;
              var playing = false;
              return { original, still, playing, rating };
            });
            GifsService.cache = gifs;
            return gifs;
          });
        }
      }
    })
    .state('app.gif', {
      url: 'gif/:index',
      component: 'myGif',
      resolve: {
        gif: function(GifsService, $stateParams) {
          console.log(GifsService.cache[$stateParams.index]);
          return GifsService.cache[$stateParams.index];
        }
      }
    })
    $urlRouterProvider.otherwise('/');
}
