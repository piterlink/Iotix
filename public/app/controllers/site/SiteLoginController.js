angular.module('IotixApp').controller('SiteLoginController', function ($scope, $http, $route, $routeParams, $location, server, Auth, $window, $cookies, $rootScope) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'login';
    vm = this;
    vm.title = 'Login';
    vm.action = action;
    var cookie = $cookies;

    var form = {
        username: "",
        password: ""
    };

    vm.login = function (form) {
        if (form) {
            form.username = angular.lowercase(form.username);
            alert(form.username);
            //console.log(server / +'/login');
            //service
            $http({
                method: 'POST',
                url: ipServer + '/authenticate',
                data: form
            }).then(function (response) {               
                Auth.setToken(response.data.token);
                Auth.setDados(response);
                $location.path('/device/index');
                function reload() {
                    $window.location.reload();
                }       

            }).catch(function (error) {
                console.log(error);
            });
        } else {
            console.log('Campos não preenchidos');
        }

    };  
});