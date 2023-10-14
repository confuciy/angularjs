angular.module('app').
    controller('personController', function ($scope, personService) {

        $scope.person = personService.getPerson();

        $scope.setPerson = function () {
            personService.setPerson($scope.person);
        };

        $scope.getPersonInfo = function () {
            return $scope.person.LastName + ' ' + $scope.person.FirstName + ' ' + $scope.person.MiddleName + ', ' + $scope.person.Age;
        };
    });

angular.module('app').
    service('personService', function () {
        this.getPerson = function () {
            return angular.fromJson(localStorage['person']);
        };
        this.setPerson = function (person) {
            localStorage['person'] = angular.toJson(person);
        };
    });