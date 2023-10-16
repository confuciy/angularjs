angular.module('shopApp', ['ngRoute']);

angular.module('shopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: 'eShop/views/main.html',
            })
            .when("/goods", {
                templateUrl: 'eShop/views/goods.html',
                controller: 'goodsController'
            })
            .when("/basket", {
                templateUrl: 'eShop/views/basket.html',
                controller: 'basketController'
            })
            .when("/orders", {
                templateUrl: 'eShop/views/orders.html',
                controller: 'ordersController'
            })
            .when("/orders/:id", {
                templateUrl: 'eShop/views/orders_one.html',
                controller: 'ordersController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location) {

        $rootScope.isActiveArray = [];

        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
            $rootScope.isActiveArray = [];
            $rootScope.isActiveArray['/' + $location.path().split('/')[1]] = true;
        });
    });

angular.module('shopApp')
    .controller('menuController', function ($scope, $rootScope, shopService) {

        $scope.basketCount = shopService.getBasketCount();
        $scope.$on("namechanged_basket", function (event, value) {
            $scope.basketCount = value;
        });

        $scope.ordersCount = shopService.getOrdersCount();
        $scope.$on("namechanged_orders", function (event, value) {
            $scope.ordersCount = value;
        });

        $scope.isActive = function (viewLocation) {
            return $rootScope.isActiveArray[viewLocation];
        };
    });

$(function () {
    $("input[type='number']").on('input', function (e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
});