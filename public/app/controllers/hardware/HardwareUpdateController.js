angular.module('IotixApp').controller('HardwareUpdateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'hardware';
    vm = this;
    vm.title = 'Editar hardware';
    var id = $routeParams.id;

    var init = function () {
    };
    var find = function (id) {
        $http({
            method: 'GET',
            url: ipServer + '/' + action + '/' + id
        }).then(function (res) {
            vm.form = res.data;
            init();
        });
    };

    find(id);

    vm.save = function (data) {
        $http({
            method: 'PUT',
            url: ipServer + '/' + action + '/' + id,
            data: data
        }).then(function () {
            console.log('ALTERADO COM SUCESSO');
            $location.path('/' + action + '/index');
        });
    };

    vm.cancel = function () {
        $location.path('/' + action + '/index');
    };
});