angular.module('IotixApp').controller('ClientIndexController', function ($scope, $http, $route, $routeParams, $location, server) {
   var ipServer = server.ip;
    var client = 'iotix';
    var action = 'client';
    vm = this;
    vm.title = 'Clientes';
    vm.action = action;

    var clientSocket = io(ipServer + '/client');
    
    clientSocket.on('update',function(msg){
        console.log('update');
    })

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