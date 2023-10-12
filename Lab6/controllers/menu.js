angular.module('routeApp')
    .controller('menuController', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {

            //alert(viewLocation + ' | ' + $location.path() + ' | ' + $location.path().match('\/persons\/([0-9]+)'));

            let active = false;

            if (viewLocation === $location.path()) {
                active = true;
            }
            if (viewLocation === '/persons' && $location.path().match('\/persons\/([0-9]+)') !== null) {
                active = true;
            }

            return active;
        };
    });