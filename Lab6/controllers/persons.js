angular.module('routeApp')
    .controller('personsController', function ($scope, $routeParams) {

        $scope.OrderName = 'lastName';
        $scope.OrderBy = false;
        $scope.personsNameSearch = '';

        $scope.persons = [
            { 'id': '1', 'lastName': 'Иванов', 'firstName': 'Игнатий', 'middleName': 'Семенович', 'descr': 'Самостоятельный работник — никто вообще не знает, что он делает.' },
            { 'id': '2', 'lastName': 'Петров', 'firstName': 'Павлентий', 'middleName': 'Вениаминович', 'descr': 'Живой ум — всегда наготове отмазки.' },
            { 'id': '3', 'lastName': 'Сидоров', 'firstName': 'Афанасий', 'middleName': 'Пантелеевич', 'descr': 'Представляет большую ценность для компании — является на работу вовремя.' }
        ];

        if ($routeParams['id'] != undefined) {            
            $scope.person = $scope.persons.find(x => x.id === $routeParams['id']);
        }

        $scope.orderBy = function (field) {
            $scope.OrderName = field;
            $scope.OrderBy = !$scope.OrderBy;
        };
    });