angular.module('shopApp')
    .controller('basketController', function ($scope, shopService, $sce) {

        $scope.basket = shopService.getBasket();
        $scope.basketCount = shopService.getBasketCount();
        $scope.$emit("namechanged_basket", $scope.basketCount);
        $scope.basketQuantity = [];
        $scope.basketAllPriceSum = 0;
        $scope.orderForm = 0;
        $scope.orderCustomer = '';
        $scope.orderComment = '';
        $scope.orderWasCreated = 0;
        $scope.orderError = '';
        $scope.orderWasCreatedInfo = $sce.trustAsHtml('Ваш заказ под номером №XXX на сумму 2 070,00 ₽ успешно сформирован! Поднобную информацию можно посмотреть в разделе <a href="#!/orders">заказы</a>!');
        $scope.order;
        $scope.orders = shopService.getOrders();
        $scope.ordersCount = shopService.getOrdersCount();
        $scope.$emit("namechanged_orders", $scope.ordersCount);
        

        $scope.getBasketNormalPrice = function (price) {
            return price.toFixed(2);
        };

        $scope.setBasketAllPriceSum = function () {
            let basketAllPriceSum = 0;
            angular.forEach($scope.basket, function (value, key) {

                basketAllPriceSum += value.price * value.quantity;
            });
            $scope.basketAllPriceSum = basketAllPriceSum.toFixed(2);
        };

        $scope.deleteBasketAllById = function (id) {

            $scope.basketQuantity[id] = 0;
            
            shopService.setBasketUpdate(id, 0);

            $scope.basket = shopService.getBasket();
            $scope.setBasketAllPriceSum();

            $scope.basketCount = shopService.getBasketCount();
            $scope.$emit("namechanged_basket", $scope.basketCount);
        };

        $scope.deleteBasketById = function (id, quantity) {

            shopService.setBasketUpdate(id, quantity);

            $scope.basket = shopService.getBasket();
            $scope.setBasketAllPriceSum();

            $scope.basketCount = shopService.getBasketCount();
            $scope.$emit("namechanged_basket", $scope.basketCount);
        };

        $scope.createOrder = function () {

            if ($scope.orderCustomer.trim() == '') {
                $scope.orderError = $sce.trustAsHtml('Не заполнено ФИО!');            
            } else {

                shopService.createOrder($scope.basket, $scope.orderCustomer, $scope.orderComment);

                let order = angular.fromJson(localStorage['order_last']);

                if (order.Id != null && order.Id !== undefined) {

                    $scope.orderForm = 2;
                    $scope.orderWasCreated = 1;
                    $scope.orderWasCreatedInfo = $sce.trustAsHtml('Ваш заказ под номером №<b>' + order.Id + '</b> на сумму <b>' + $scope.basketAllPriceSum + '</b> ₽ успешно сформирован! Поднобную информацию можно посмотреть в разделе <a href="#!/orders">заказы</a>!');

                    shopService.clearBasket();
                    $scope.basket = shopService.getBasket();
                    $scope.setBasketAllPriceSum();

                    $scope.basketCount = shopService.getBasketCount();
                    $scope.$emit("namechanged_basket", $scope.basketCount);

                    $scope.ordersCount = shopService.getOrdersCount() + 1;
                    $scope.$emit("namechanged_orders", $scope.ordersCount);
                }
            }
        };
    });