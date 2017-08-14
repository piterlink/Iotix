angular.module('IotixApp').controller('UserIndexController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var index = 'iotix';
    var action = 'user';
    vm = this;
    vm.title = 'Usuários';
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