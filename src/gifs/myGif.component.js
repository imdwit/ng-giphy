var myGif = {
  template: `
    <div>
      <img ng-src="{{$ctrl.gif.original}}"/>
    </div>
  `,
  bindings: {
    gif: '<',
  },
  controller() {
    this.$onInit = () => {
      console.log(this);
    };
  },
};

export default myGif;
