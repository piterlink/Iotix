angular.module('IotixApp').controller('HardwareCreateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'hardware';
    vm = this;
    vm.title = 'Novo hardware';

    vm.save = function (data) {
        $http({
            method: 'POST',
            url: ipServer + '/' + action,
            data: data
        }).then(function () {
            console.log('CRIADO COM SUCESSO');
            $location.path('/' + action + '/index');
        });
    };
    vm.cancel = function () {
        $location.path('/' + action + '/index');
    };
});