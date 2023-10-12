angular.module('routeApp')
    .controller('goodsController', function ($scope, filterFilter) {

        $scope.OrderName = 'name';
        $scope.OrderBy = false;
        $scope.goodsNameSearch = '';
        $scope.allGoodPriceSum = 0;

        $scope.goodsItems = [
            { 'name': 'Phone', 'price': 890.45, 'quantity': 50 },
            { 'name': 'Glass', 'price': 460.1, 'quantity': 12 },
            { 'name': 'Lamp', 'price': 1250.00, 'quantity': 3 },
        ];

        $scope.getGoodsNormalPrice = function (price) {

            return price.toFixed(2);
        };

        $scope.orderBy = function (field) {

            $scope.OrderName = field;
            $scope.OrderBy = !$scope.OrderBy;
        };

        $scope.setAllGoodPriceSum = function () {

            let allGoodPriceSum = 0;

            angular.forEach(filterFilter($scope.goodsItems, { name: $scope.goodsNameSearch }), function (value, key) {

                allGoodPriceSum += value.price * value.quantity;
            });

            $scope.allGoodPriceSum = allGoodPriceSum.toFixed(2);
        };
    });