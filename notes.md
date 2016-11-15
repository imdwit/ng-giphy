## talking points
  1. modules
  2. components
  3. directives
  4. dependency injection

#### modules
  * set (create):

    + `angular.module('app', []);`

  * set (create), and require other modules (dependencies):

    + `angular.module('app', ['app.somemodule1', 'app.somemodule2']);`

  * get module:

    + `angular.module('app');`
    + `var app = angular.module('app');`
    + ```
      app.run(function() {
        /*
          Run blocks - get executed after the injector is created and are used to kickstart the application.
          Only instances and constants can be injected into run blocks.
          This is to prevent further system configuration during application run time.
        */
      });
      app.config(function() {
        /*
        Configuration blocks - get executed during the provider registrations and configuration phase.
        Only providers and constants can be injected into configuration blocks.
        This is to prevent accidental instantiation of services before they have been fully configured.
        */
      });
    ```

#### components
  * syntax
  * bindings
    * What types of bindings can a component receive?
      + '<' data
      + '@' text
      + '&' callback | $event "emitter"
  * templates
    + interpolation
    + onetime bindings
  * controllers ($ctrl)
  * lifecycle hooks
  * camelCase component name becomes kebab-case in markup

  ```javascript
    var fooBar = {
      bindings: {
        someValue: '<',
      },
      controller: function() {
        this.$oniInit = function() {
          this.otherValue = 'qux';
          this.count = 0;
        };

        this.increment = function() {
          this.count++;
        };
      },
      template: `
      <div>
        <p>{{$ctrl.someValue}}</p>
        <p>{{::$ctrl.otherValue}}</p>
        <p>{{$ctrl.count}}</p>
        <p><a ng-click="$ctrl.count++"</a></p>
        <p><a ng-click="$ctrl.increment()"</a></p>
      </div>
      `
    };

    angular.module('someModule', []);

    var someModule = angular.module('someModule');
    someModule.component('fooBar', fooBar);
  ```
  in the html/parent
  ```html
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
            // DOM manipulation goes here!
            // not components
            el.on('click', function() {
              $(this).addClass('active');
            });
            // or
            el.fitText(1.2);
            // or
            el.typeahead('val', myVal);

            //  Looking up elements via selectors is not supported by jqLite!
            // use native dom api
            var children = el[0].querySelectorAll('.some-child');
            // wrap in jqlite
            var $children = angular.element(children);
            $children.addClass('active');
            // youmightnotneedjquery
          }
        }
      });
    ```
    * camelCase directive name becomes kebab-case in markup
    * The `restrict` option is typically set to:
      + 'A' - only matches attribute name
        + `<div foo-bar some-value="baz">`
      + 'E' - only matches element name
        + `<foo-bar some-value="baz"></foo-bar>`
      + 'C' - only matches class name
      + 'M' - only matches comment




#### dependency injection
  * Dependency Injection (DI) is a software design pattern that deals with how components get hold of their dependencies.

  ```javascript

    var myModule = angular.module('app', []);

    var myService = myModule.factory('myService', function($http) {
      // we injection the built in $http service
      var api = 'http://giphyapi.com';
      return {
        fetchTheData: function() {
          return $http({
            method: 'GET',
            url: api,
          });
        }
      }
    });

    var myComponent = myModule.component('myComponent', {
      template: '<div>{{$ctrl.gifs}}</div>',
      controller: function(myService) {
        // we injection myService into myComponent
        this.$onInit = function() {
          this.gifs = [];
        }
        this.fetch = function() {
          myService.fetchTheData()
            .then((res) => {
              this.gifs = res;
            });
        }
      }
    });
    ```










https://toddmotto.com/modern-angular-interview-questions
