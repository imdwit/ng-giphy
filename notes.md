## talking points
  1. components
  2. directives
  3. modules
  4. dependency injection


#### components
  * syntax
  * bindings
    * What types of bindings can a component receive?
      + '<' data
      + '@' text
      + '&' callback | $event "emitter"
  * templates
  * controllers ($ctrl)

  ```javascript
    var fooBar = {
      bindings: {
        someValue: '<',
      },
      controller: function() {

      },
      template: `<div>{{$ctrl.someValue}}</div>`
    };

    app.component('fooBar', fooBar);
    <foo-bar someValue="baz"></foo-bar>
  ```


#### directives
  * what is a directive?
    * "At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler (`$compile`) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children."
  * built in directives such as:
    + `ng-click`
      + runs an expression
      + `ng-click="count = count + 1"`
      + `ng-click="$ctrl.someMethod($event)"`
    + `ng-model`
    + `ng-transclude`
      like `{this.props.children}` > react
    + `ng-bind-html`?
      + Evaluates the expression and inserts the resulting HTML into the element in a secure way.
      + include `ngSanitize` module
      + `ng-bind-html="myHtmlString"`
    + `jqlite`
      + If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in subset of jQuery, called "jQuery lite" or jqLite.
      + jqLite is a tiny, API-compatible subset of jQuery that allows Angular to manipulate the DOM in a cross-browser compatible way. jqLite implements only the most commonly needed functionality with the goal of having a very small footprint.
      + `angular.element( document.querySelectorAll('.some-element') )`
      + `$('.some-element')`
    + `ng-app`
        + Use this directive to auto-bootstrap an AngularJS application. The ngApp directive designates the root element of the application and is typically placed near the root element of the page - e.g. on the <body> or <html> tags.
    + 'ng-repeat'
      + The ngRepeat directive instantiates a template once per item from a collection. Each template instance gets its own scope, where the given loop variable is set to the current collection item, and $index is set to the item index or key.
      + `<div class="foo" ng-repeat="model in collection track by model.id">`
      + `var n = collection.length;` there will be `n` number of divs
    + filters
      + collection `<div class="foo" ng-repeat="model in collection | filter:someVarialbe track by model.id">`
      + dates
      + currency
      + orderby
  * custom direcitvies
    + directives should be reserved for dom manipulation
    + ie dom manip. shouldn't go in a controller
    + wrap a jquery plugin in a directive
    ```javascript
      app.directive('fooBar', function() {
        return {
          restrict: 'EA',
          scope: {
            someValue: '=',
          },
          // template: '<div>I am a div {{someValue}}</div>',
          link: function(scope, el, attrs) {
            // scope is an Angular scope object.
            // el is the jqLite-wrapped or jquery element that this directive matches.
            // think: $(el);
            // attrs is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
          }
        }
      })
    ```
    * The `restrict` option is typically set to:
      + 'A' - only matches attribute name
        + `<div foo-bar some-value="baz">`
      + 'E' - only matches element name
        + `<foo-bar some-value="baz"></foo-bar>`
      + 'C' - only matches class name
      + 'M' - only matches comment







#### modules
  set (create):

  `angular.module('app', []);`

  set (create), require other modules:

  `angular.module('app', ['app.somemodule1', 'app.somemodule2']);`

  get module:

  `angular.module('app');`





https://toddmotto.com/modern-angular-interview-questions
