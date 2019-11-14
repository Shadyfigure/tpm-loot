(function () {
angular.module('tpmGuildloot',['ngRoute', 'ui.bootstrap'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'main'
    })
    .when('/items', {
        templateUrl: 'templates/items.html',
        controller: 'items'
    })
    .when('/bosses', {
        templateUrl: 'templates/bosses.html',
        controller: 'bosses'
    })
    .when('/instances', {
        templateUrl: 'templates/instances.html',
        controller: 'instances'
    })
    .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix("");
}]);
})();
