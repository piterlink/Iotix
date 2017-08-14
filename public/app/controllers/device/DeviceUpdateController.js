angular.module('IotixApp').controller('DeviceUpdateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'device';
    vm = this;
    vm.title = 'Editar dispostivo';
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

    var getClient = function () {
        $http({
            method: 'GET',
            url: ipServer + '/client/'
        }).then(function (res) {
            vm.clientList = res.data;
        });
    };
    getClient();

    var getHardware = function () {
        $http({
            method: 'GET',
            url: ipServer + '/hardware/'
        }).then(function (res) {
            vm.hardwareList = res.data;
        });
    };
    getHardware();

    var getCategory = function () {
        $http({
            method: 'GET',
            url: ipServer + '/category/'
        }).then(function (res) {
            vm.categoryList = res.data;
        });
    };
    getCategory();
});