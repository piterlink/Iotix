angular.module('IotixApp').controller('UserUpdateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'user';
    vm = this;
    vm.title = 'Editar usuário';

    var id = $routeParams.id;

    var init = function () {
        setTimeout(function () {
            $('#cep').mask('00000-000', {
                onComplete: function (cep) {
                    vm.getCep(cep);
                },
            });
            $('#birth').mask('00/00/0000');
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

    var getClient = function () {
        $http({
            method: 'GET',
            url: ipServer + '/client/'
        }).then(function (res) {
            vm.clientList = res.data;
        });
    };
    getClient();
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

    vm.getCep = function (cep) {
        $http({
            method: 'GET',
//                url: ipServer + '/service/buscarCep/' + cep
            url: 'http://viacep.com.br/ws/' + cep + '/json'
        }).then(function (res) {
            if (res.data.erro) {
                vm.form.address = {};
            } else {
                vm.disable = 'disabled';
                vm.form.address.street = res.data.logradouro;
                vm.form.address.district = res.data.bairro;
                vm.form.address.city = res.data.localidade;
                vm.form.address.state = res.data.uf;
            }
        }).catch(function () {
        });
    };
});