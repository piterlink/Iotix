angular.module('IotixApp').controller('DashboardIndexController', function ($scope, $http, $route, $routeParams, $location, server, Auth) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'Dashboard';
    vm = this;
    vm.title = 'Dashboard';
    vm.action = action;
    vm.path = $location.path();
    dadosSession = Auth.getDados();
    client = dadosSession.clientId;

    var currentValue = [];
    var labelCurrent = [];

    // var find = function (page, pagesize) {
    //     console.log('page: ' + page + 'pagesize: ' + pagesize);
    //     $http({
    //         method: 'POST',
    //         data: { page: page, pagesize: pagesize },
    //         url: ipServer + '/history'
    //     }).then(function (res) {
    //         console.log(res.data.data);
    //         console.log(Object.keys(res.data.data));
    //         if (Object.keys(res.data.data).length > 0) {
    //             vm.list = res.data.data;

    //             angular.forEach(vm.list, function (history) {
    //                 console.log(history.atuador.current);
    //                 currentValue.push(history.atuador.current);
    //                 labelCurrent.push(pagesize.toString())
    //                 pagesize--;
    //             });
    //             console.log(currentValue);
    //         };
    //     });
    // };
    // find(1, 100);


    var historySocket = io(ipServer + '/dashboard');

    $scope.labels = labelCurrent;
    $scope.series = ['Corrente (A)'];
    $scope.data = [
       currentValue
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };


    vm.countSensorAmbiente = 0;
    vm.countAtuadorAnalogico = 0;
    vm.countAtuadorPadrao = 0;

    var findDevice = function () {
        $http({
            method: 'GET',
            url: ipServer + '/device/findDeviceByClient/' + client
        }).then(function (res) {
            vm.list = res.data;
            console.log(vm.list);
            angular.forEach(vm.list, function (device) {
                if (device.hardware.class == 'atuador_padrao')
                    vm.countAtuadorPadrao++
                if (device.hardware.class == 'atuador_padrao')
                    vm.countAtuadorAnalogico++
                if (device.hardware.class == 'atuador_padrao')
                    vm.countSensorAmbiente++
            });
            $scope.labels = ["Sensor de Ambiente", "Atuador Padrão", "Atuador Analógico"];
            $scope.data = [vm.countSensorAmbiente, vm.countAtuadorPadrao, vm.countAtuadorAnalogico];
        });
    };
    findDevice();
    console.log([vm.countSensorAmbiente,vm.countAtuadorPadrao, vm.countAtuadorAnalogico])






});