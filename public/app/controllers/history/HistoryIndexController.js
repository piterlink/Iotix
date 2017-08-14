angular.module('IotixApp').controller('HistoryIndexController', function ($scope, $http, $route, $routeParams, $location, server) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'history';
    vm = this;
    vm.title = 'Histórico';
    vm.action = action;
    vm.path = $location.path();
    
    
    vm.currentPagesize = 10;
    vm.total = 0;



    var historySocket = io(ipServer + '/history');

    var getCount = function () {
        $http({
            method: 'GET',
            url: ipServer + '/' + action + '/count/'
        }).then(function (res) {
            vm.total = res.data.value;
            var totalPage = vm.total / vm.currentPagesize;
            console.log(vm.total % vm.currentPagesize);
            if (vm.total % vm.currentPagesize > 0) {
                vm.totalPage = Math.trunc(totalPage) + 1;
            } else {
                vm.totalPage = totalPage;
            }
            console.log(vm.total + '-' + vm.totalPage);
        })
    }

    vm.alterPagesize = function (value) {
        console.log(value);
        vm.currentPagesize = value;
        find(1, parseInt(value));

    }


    var find = function (page, pagesize) {
        console.log('page: ' + page + 'pagesize: ' + pagesize);
        $http({
            method: 'POST',
            data: { page: page, pagesize: pagesize },
            url: ipServer + '/' + action
        }).then(function (res) {
            getCount();
            console.log(res.data.data);
            console.log(Object.keys(res.data.data));
            if (Object.keys(res.data.data).length > 0) {
                vm.currentPage = page;
                vm.currentPagesize = pagesize;
                vm.list = res.data.data;
            }
        });
    };
    find(1, 10);
    
    vm.nextHistory = function (pagesize) {
        find(vm.currentPage + 1, pagesize);
    }

    vm.previousHistory = function (pagesize) {
        find(vm.currentPage - 1, pagesize);
    }
    
    $scope.formatTime = function (utcDate) {
        return moment(utcDate).format("MMddYYYY");
    }

});