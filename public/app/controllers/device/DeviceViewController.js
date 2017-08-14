angular.module('IotixApp').controller('DeviceViewController', function ($scope, $http, $route, $routeParams, $location, Auth, server, $localStorage, $rootScope, $sessionStorage, $interval, $cookies) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'device';
    vm = this;

    var id = $routeParams.id;

    var deviceSocket = io(ipServer + '/iotix/device');



vm.currentValue = [];




    deviceSocket.on('deviceConnect', function (msg) {

        if (vm.device._id === msg.result._id) {
            $scope.$apply(function () {
                vm.device.modified = new Date().toISOString();
            });
        };

    });



    deviceSocket.on('updateAtuadorCurrent', function (msg) {

        if (vm.device._id === msg.result._id) {
            $scope.$apply(function () {
                vm.device.modified = new Date().toISOString();
                vm.device.connection = 'ONLINE';
                vm.device.atuador.current = msg.current;
                currentValue.push(msg.current);
                
                vm.currentValue.push(msg.current)
                vm.currentValue.shift();
                vm.datasetOverride = vm.currentValue.push(msg.current);
                console.log(vm.currentValue);
            });
            // var slider = $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
            $('#device-img-' + vm.device._id).css('opacity', '100');
            $('#device-img-fire-' + vm.device._id).css('opacity', '100');
            // grayImg(vm.device._id, 100 - vm.device.atuador.val);

        }

    });

    deviceSocket.on('updateAtuadorVal', function (msg) {

        if (vm.device._id === msg.result._id) {
            $scope.$apply(function () {
                vm.device.modified = new Date().toISOString();
                if (msg.connection == 'OFFLINE') {
                    $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: true });
                    vm.device.connection = 'OFFLINE';
                } else {
                    if (msg.connection == 'ONLINE') {
                        $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
                        vm.device.connection = 'ONLINE';
                    }
                }
            });
            //var slider = $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
            $('#device-img-' + vm.device._id).css('opacity', '100');
            $('#device-img-fire-' + vm.device._id).css('opacity', '100');
            grayImg(vm.device._id, 100 - msg.val);

        }

    });


    deviceSocket.on('updateSensorAmbiente', function (msg) {

        if (vm.device._id === msg.result._id) {
            $scope.$apply(function () {
                vm.device.modified = new Date().toISOString();
                vm.device.sensor_ambiente.temperature = parseInt(msg.result.sensor_ambiente.temperature);
                vm.device.sensor_ambiente.humidity = parseInt(msg.result.sensor_ambiente.humidity);
                vm.device.sensor_ambiente.presence = parseInt(msg.result.sensor_ambiente.presence);
                vm.device.sensor_ambiente.fire = parseInt(msg.result.sensor_ambiente.fire);
                vm.device.connection = 'ONLINE';
                $('#device-img-' + vm.device._id).css('opacity', '100');
                $('#device-img-fire-' + vm.device._id).css('opacity', '100');
            });
        };

    });
    deviceSocket.on('updateAtuadorState', function (msg) {

        if (msg.state === "on") {
            grayImg(msg.result._id, 0);
        } else {
            if (msg.state === "off") {
                grayImg(msg.result._id, 100);
            }
        }
        angular.forEach(vm.list, function (device) {
            if (vm.device._id === msg.result._id) {
                vm.device.modified = new Date().toISOString();
            }
        });

    });





    var find = function (id) {
        $http({
            method: 'GET',
            url: ipServer + '/' + action + '/' + id
        }).then(function (res) {
            vm.device = res.data;
            vm.title = res.data.name;
            console.log(vm.device);
            setTimeout(function () {
                configDevice(res.data);
            }, 500);
        });
    };

    find(id);



    var configDevice = function (device) {

        // vm.updateState(device._id,'on');
        if (device.atuador.state === 'off') {
            var gray = 100;
        } else {
            var gray = 0;
        }

        if (device.connection == 'OFFLINE') {
            $('#device-img-' + device._id).css('opacity', '0.65');
            $('#device-img-fire-' + device._id).css('opacity', '0.65');
            var disable = true;
        } else {
            $('#device-img-' + device._id).css('opacity', '100');
            $('#device-img-fire-' + device._id).css('opacity', '100');

        }
        if (device.hardware.class === 'atuador_analogico') {
            grayImg(device._id, gray);
        }

        if (device.hardware.class === 'atuador_analogico') {
            grayImg(device._id, 100 - device.atuador.val);
            $("#slider-" + device._id).ionRangeSlider({
                min: 0,
                max: 100,
                from: device.atuador.val,
                hide_min_max: true,
                hide_from_to: false,
                grid: false,
                disable: disable,
                onFinish: function (data) {
                    grayImg(device._id, 100 - data.from_percent);
                    updateVal(device._id, { val: data.from_percent });
                },
            });
            if (device.connection === 'ONLINE') {
                $("#slider-" + device._id).data("ionRangeSlider").update({ disable: false });
            }
        }



        if (device.hardware.class === 'atuador_padrao') {
            //console.log("#slider-" + device._id);
            grayImg(device._id, gray);
        }
        if (device.hardware.class === 'sensor_ambiente') {
            if (device.sensor_ambiente) {
                if (device.sensor_ambiente.fire) {
                    console.log('Atenção! Um possível incêndio foi detectado, favor verificar ou chamar a emergência');
                }
            }
        }
    };
    var updateVal = function (id, data) {
        $http({
            method: 'POST',
            url: ipServer + '/device/updateVal/' + id,
            data: data
        }).then(function () {
            console.log('valor atualizado');
        });
    }
    vm.updateValOn = function (id) {
        updateVal(id, { val: 100 });
    }
    vm.updateValOff = function (id) {
        updateVal(id, { val: 0 })
    }

    var grayImg = function (id, gray) {
        $('#device-img-' + id).css('filter', 'grayscale(' + gray + '%)');
        $('#device-img-' + id).css('-webkit-filter', 'grayscale(' + gray + '%)');
    };

    var currentValue = [];
    var labelCurrent = [];

    var findCurrent = function (page, pagesize) {
        console.log('page: ' + page + 'pagesize: ' + pagesize);
        $http({
            method: 'POST',
            data: { page: page, pagesize: pagesize },
            url: ipServer + '/history'
        }).then(function (res) {
            console.log(res.data.data);
            console.log(Object.keys(res.data.data));
            if (Object.keys(res.data.data).length > 0) {
                vm.listCurrent = res.data.data;

                angular.forEach(vm.listCurrent, function (history) {
                    
                    //console.log(vm.listCurrent.atuador.current);
                    //vm.currentValue.push(history.atuador.current);
                    labelCurrent.push("");
                    pagesize--;
                });
                console.log(currentValue);
            };
        });
    };
    findCurrent(1,15);


    vm.labels = labelCurrent;
    vm.series = ['Corrente (A)'];
    vm.data = [
        vm.currentValue
    ];
    vm.onClick = function (points, evt) {
        console.log(points, evt);
    };
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    vm.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },                
            ]
        },
        animation : false,
    };



});