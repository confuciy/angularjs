angular.module('routeApp', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'views/main.html',
        })
        .when("/persons", {
            templateUrl: 'views/persons.html',
            controller: 'personsController'

        })
        .when("/persons/:id", {
            templateUrl: 'views/persons_one.html',
            controller: 'personsController'
        })
        .when("/goods", {
            templateUrl: 'views/goods.html',
            controller: 'goodsController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
/*
.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {

        alert($location.path());
    });
});
*/