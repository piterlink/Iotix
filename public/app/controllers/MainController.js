angular.module('IotixApp').controller('MainController', function ($scope, $http, $route, $routeParams, $location, server, $window, $localStorage, $cookies, $rootScope, Auth) {
    $scope.title = ' Iotix App';
    $scope.token = Auth.getToken();

    $scope.logout = function () {
        $localStorage.$reset();
        $location.path('site/login');
    };
});