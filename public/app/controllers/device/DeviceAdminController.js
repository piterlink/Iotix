angular.module('IotixApp').controller('DeviceAdminController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'device';
    vm = this;
    vm.title = 'Dispositivos';
    vm.action = action;
    var find = function () {
        $http({
            method: 'GET',
            url: ipServer + '/' + action
        }).then(function (res) {
            vm.list = res.data;
        });
    };
    find();
    vm.delete = function (id) {
        $http({
            method: 'DELETE',
            url: ipServer + '/' + action + '/' + id
        }).then(function (res) {
            $('#tr_' + id).fadeOut('fast');
            console.log('DELETADO COM SUCESSO');
        });
    }

});