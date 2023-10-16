angular.module('shopApp')
    .service('shopService', function ($http, $q) {

        this.getGoods = function () {
            return $http.get('api/products')
                .then(function (response) {
                    return response;
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        this.getGoodsById = function (id) {
            return $http.get('api/products/' + id)
                .then(function (response) {
                    return response;
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        this.setBasketAdd = function (id, quantity) {
            if (localStorage.getItem('basket') === null) {
                let basket = [];
                this.getGoodsById(id)
                    .then(function (response) {
                            
                        let goods_data = angular.fromJson(response.data);
                        
                        basket.push({ "id": id, "quantity": quantity, "title": goods_data.title, "price": goods_data.price });
                        localStorage['basket'] = angular.toJson(basket);         

                    }, function (error) {   
                        alert('DB ERROR');
                    });
            } else {
                let basket = angular.fromJson(localStorage['basket']);
                if (basket.find(x => x.id === id)) {
                    basket.find(x => x.id === id).quantity += quantity;
                } else {
                    this.getGoodsById(id)
                        .then(function (response) {
                            
                            let goods_data = angular.fromJson(response.data);
                        
                            basket.push({ "id": id, "quantity": quantity, "title": goods_data.title, "price": goods_data.price });
                            localStorage['basket'] = angular.toJson(basket);         

                        }, function (error) {   
                            alert('DB ERROR');
                        });
                }
                localStorage['basket'] = angular.toJson(basket);
            }
        },

        this.setBasketUpdate = function (id, quantity) {
            if (localStorage.getItem('basket') === null) {
                let basket = [];
                this.getGoodsById(id)
                    .then(function (response) {
                            
                        let goods_data = angular.fromJson(response.data);
                        
                        basket.push({ "id": id, "quantity": quantity, "title": goods_data.title, "price": goods_data.price });
                        localStorage['basket'] = angular.toJson(basket);         

                    }, function (error) {   
                        alert('DB ERROR');
                    });
            } else {
                let basket = angular.fromJson(localStorage['basket']);
                if (basket.find(x => x.id === id)) {
                    basket.find(x => x.id === id).quantity = quantity;
                } else {
                    this.getGoodsById(id)
                        .then(function (response) {
                            
                            let goods_data = angular.fromJson(response.data);
                        
                            basket.push({ "id": id, "quantity": quantity, "title": goods_data.title, "price": goods_data.price });
                            localStorage['basket'] = angular.toJson(basket);         

                        }, function (error) {   
                            alert('DB ERROR');
                        });
                }
                localStorage['basket'] = angular.toJson(basket);
            }
        },

        this.getBasketCount = function () {
            let basketCount = 0;
            let basket = angular.fromJson(localStorage['basket']);
            if (basket !== null) {
                angular.forEach(basket, function (value, key) {
                    basketCount += value.quantity;
                });
            }
            return basketCount;
        },

        this.getOrders = function () {
            return $http.get('api/Orders')
                .then(function (response) {
                    localStorage['orders'] = angular.toJson(response.data);
                    return response;
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        this.deleteOrder = function (id) {
            return $http.delete('api/Orders/' + id)
                .then(function (response) {
                    return response;
                }, function (response) {
                    return $q.reject(response.data);
                });
        },

        this.getOrdersCount = function () {
            return angular.fromJson(localStorage['orders']).length;
        },

        this.getBasket = function () {
            return angular.fromJson(localStorage['basket']);
        },

        this.clearBasket = function () {            
            localStorage.removeItem("basket");
        },

        this.createOrder = function (basket, customer, comment) {
            return $http.post('api/Orders', { odate: (new Date()), customer: customer, comment: comment })
                .then(function (response) {
                    
                    localStorage['order_last'] = angular.toJson(response.data);
                    
                    return response.data;
                }, function (response) {

                    alert('ERROR angular.toJson(response.data): ' + angular.toJson(response.data));

                    return $q.reject(response.data);
                });
        },

        this.createOrderLine = function (orderId, productId, quantity, price) {

            let data = {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
                price: price
            };

            $http.post('api/OrderLines', data)
                .then(function (response) {
                    
                    alert('createOrderLine: ' + angular.toJson(response.data));

                    let orderLine = angular.fromJson(response.data);

                    if (orderLine.Id != null && orderLine.Id !== undefined) {

                        return orderLine.Id;
                    }
                }, function (response) {

                    alert('ERROR angular.toJson(response.data): ' + angular.toJson(response.data));

                    return $q.reject(response.data);
                });
        }
    });