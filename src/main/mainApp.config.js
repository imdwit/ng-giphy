export default function routeConfig($stateProvider) {
  $stateProvider
    .state('app', {
      url: '/',
      component: 'mainApp',
    })
    .state('app.gif', {
      url: ':topic',
      component: 'gifsList',
      resolve: {
        gifs: function($stateParams, GifsService) {
          var topic = $stateParams.topic;
          return GifsService.fetch(topic)
          .then(res => {
            return res.data.data.map(gif => {
              var original = gif.images.original.url;
              var still = gif.images.original_still.url;
              var rating = gif.rating;
              var playing = false;
              return { original, still, playing, rating };
            });
          });
        }
      }
    })
}