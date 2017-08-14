angular.module('IotixApp').controller('CategoryCreateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'category';
    vm = this;
    vm.title = 'Nova categoria';

    var init = function () {
    }
    init();

    vm.save = function (data) {
        console.log(data);
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