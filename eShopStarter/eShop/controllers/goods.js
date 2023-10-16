angular.module('shopApp')
    .controller('goodsController', function ($scope, shopService) {

        $scope.OrderName = 'title';
        $scope.OrderBy = false;
        $scope.goodsNameSearch = '';
        $scope.goodsQuantity = [];
        $scope.basketCount = shopService.getBasketCount();
        $scope.$emit("namechanged_basket", $scope.basketCount);

        shopService.getGoods()
            .then(function (response) {
                $scope.goods = angular.fromJson(response.data);

                $scope.pageSize = 10;
                $scope.currentPage = 0;

                $scope.setCurrentPage = function (currentPage) {
                    $scope.currentPage = currentPage;
                };

                $scope.numberOfPages = function (cs) {
                    return Math.ceil(cs.length / $scope.pageSize);
                };

                $scope.getNumberAsArray = function (num) {
                    return new Array(num)
                };
            }, function (error) {
                
            });

        $scope.orderBy = function (field) {
            $scope.OrderName = field;
            $scope.OrderBy = !$scope.OrderBy;
        };

        $scope.setBasket = function (id, quantity) {

            if (quantity > 0) {

                $scope.goodsQuantity[id] = 0;
                
                shopService.setBasketAdd(id, quantity);

                $scope.basketCount += quantity;
                $scope.$emit("namechanged_basket", $scope.basketCount);
            }
        };
    });