angular.module('shopApp')
    .controller('ordersController', function ($scope, shopService) {

        $scope.ordersNameSearch = '';
        $scope.ordersShow = [];

        shopService.getOrders()
            .then(function (response) {
                $scope.orders = angular.fromJson(response.data);
                $scope.ordersCount = shopService.getOrdersCount();
                $scope.$emit("namechanged_orders", $scope.ordersCount);

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

        $scope.deleteOrder = function (id) {

            shopService.deleteOrder(id);

            $scope.ordersShow[id] = 0;

            $scope.ordersCount = shopService.getOrdersCount() - 1;
            $scope.$emit("namechanged_orders", $scope.ordersCount);
        };
    }); 