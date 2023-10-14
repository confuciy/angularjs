angular.module('app').
    controller('goodsController', function ($scope, goodsService, filterFilter) {

        $scope.goods = goodsService.getGoods();

        $scope.OrderName = 'name';
        $scope.OrderBy = false;
        $scope.goodsNameSearch = '';
        $scope.goodsAllPriceSum = 0;

        $scope.getGoodsNormalPrice = function (price) {
            return price.toFixed(2);
        };

        $scope.goodsOrderBy = function (field) {
            $scope.OrderName = field;
            $scope.OrderBy = !$scope.OrderBy;
        };

        $scope.setGoodsAllPriceSum = function () {
            let goodsAllPriceSum = 0;
            angular.forEach(filterFilter($scope.goods, { name: $scope.goodsNameSearch }), function (value, key) {
                goodsAllPriceSum += value.price * value.quantity;
            });
            $scope.goodsAllPriceSum = goodsAllPriceSum.toFixed(2);
        };

        $scope.setGoods = function (id, quantity) {
            goodsService.setGoods($scope.goods, id, quantity);
            $scope.setGoodsAllPriceSum();
        };
    });

angular.module('app').
    service('goodsService', function () {
        this.getGoods = function () {
            if (localStorage['goods'] === undefined) {
                return [
                    { 'id': '1', 'name': 'Phone', 'price': 890.45, 'quantity': 50 },
                    { 'id': '2', 'name': 'Glass', 'price': 460.1, 'quantity': 12 },
                    { 'id': '3', 'name': 'Lamp', 'price': 1250.00, 'quantity': 3 },
                ];
            } else {
                return angular.fromJson(localStorage['goods']);
            }
        };
        this.setGoods = function (goods, id, quantity) {
            goods.find(x => x.id === id).quantity = quantity;
            localStorage['goods'] = angular.toJson(goods);
        };
    });