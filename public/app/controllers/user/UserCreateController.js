angular.module('IotixApp').controller('UserCreateController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'user';

    vm = this;
    vm.title = 'Criar Usuário';
    vm.form = {};
    vm.disable = false;

    var init = function () {
        setTimeout(function () {
            $('#cep').mask('00000-000', {
                onComplete: function (cep) {
                    vm.getCep(cep);
                },
            });
            $('#birth').mask('00/00/0000');
        }, 200);
    }
    init();

    vm.save = function (data) {
        $http({
            method: 'POST',
            url: ipServer + '/' + action,
            data: data
        }).then(function () {
            console.log('CRIADO COM SUCESSO');
            $location.path('/' + action + '/index');
        }).catch(function (error) {
            console.log(error);
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

    vm.getCep = function (cep) {
        try {
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
                vm.disable = 'false';
            });
        } catch (error) {
            vm.disable = 'false';
        }

    };

});