angular.module('IotixApp').controller('ClientCreateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'client';
    vm = this;
    vm.title = 'Novo cliente';
    

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