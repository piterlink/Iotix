angular.module('IotixApp').controller('CategoryUpdateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'category';
    vm = this;
    vm.title = 'Editar categoria';

    var id = $routeParams.id;

    var init = function () {
        setTimeout(function () {
        }, 100);
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
});