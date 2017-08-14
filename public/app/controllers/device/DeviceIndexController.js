angular.module('IotixApp').controller('DeviceIndexController', function ($scope, $http, $route, $routeParams, $location, Auth, server, $localStorage, $rootScope, $sessionStorage, $interval, $cookies) {
    var ipServer = server.ip;
    var client = 'iotix';
    var action = 'device';
    vm = this;
    vm.title = 'Dispositivos';
    vm.action = action;
    var devices;
    initTemplate();
    dadosSession = Auth.getDados();
    client = dadosSession.clientId;
    // Setting a cookie
    
    var deviceSocket = io(ipServer + '/iotix/device');
    

    var init = function () {
        $http({
            method: 'GET',
            url: ipServer + '/' + action + '/findDeviceByClient/' + client
        }).then(function (res) {
            $scope.DeviceInit = res.data;
            vm.list = res.data;
            ping();
        });

    };

    deviceSocket.on('deviceConnect', function (msg) {
        angular.forEach(vm.list, function (device) {
            if (device._id === msg.result._id) {
                $scope.$apply(function () {
                    device.modified = new Date().toISOString();
                });
            };
        });
    });



    deviceSocket.on('updateAtuadorCurrent', function (msg) {
        angular.forEach(vm.list, function (device) {
            if (device._id === msg.result._id) {
                $scope.$apply(function () {
                    device.modified = new Date().toISOString();
                    device.connection = 'ONLINE';
                    device.atuador.current = msg.current;
                });
                // var slider = $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
                $('#device-img-' + device._id).css('opacity', '100');
                $('#device-img-fire-' + device._id).css('opacity', '100');
                // grayImg(device._id, 100 - device.atuador.val);

            }
        });
    });

    deviceSocket.on('updateAtuadorVal', function (msg) {
        angular.forEach(vm.list, function (device) {
            if (device._id === msg.result._id) {
                $scope.$apply(function () {
                    device.modified = new Date().toISOString();
                    if (msg.connection == 'OFFLINE') {
                        $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: true });
                        device.connection = 'OFFLINE';
                    } else {
                        if (msg.connection == 'ONLINE') {
                            $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
                            device.connection = 'ONLINE';
                        }
                    }
                });
                //var slider = $("#slider-" + msg.result._id).data("ionRangeSlider").update({ from: msg.val, disable: false });
                $('#device-img-' + device._id).css('opacity', '100');
                $('#device-img-fire-' + device._id).css('opacity', '100');
                grayImg(device._id, 100 - msg.val);

            }
        });
    });


    deviceSocket.on('updateSensorAmbiente', function (msg) {
        angular.forEach(vm.list, function (device) {
            if (device._id === msg.result._id) {
                $scope.$apply(function () {
                    device.modified = new Date().toISOString();
                    device.sensor_ambiente.temperature = parseInt(msg.result.sensor_ambiente.temperature);
                    device.sensor_ambiente.humidity = parseInt(msg.result.sensor_ambiente.humidity);
                    device.sensor_ambiente.presence = parseInt(msg.result.sensor_ambiente.presence);
                    device.sensor_ambiente.fire = parseInt(msg.result.sensor_ambiente.fire);
                    device.connection = 'ONLINE';
                    $('#device-img-' + device._id).css('opacity', '100');
                    $('#device-img-fire-' + device._id).css('opacity', '100');
                });
            };
        });
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
            if (device._id === msg.result._id) {
                device.modified = new Date().toISOString();
            }
        });

    });

    deviceSocket.on('update', function (msg) {
        find();
    });

    var find = function () {
        $http({
            method: 'GET',
            url: ipServer + '/' + action + '/findDeviceByClient/' + client
        }).then(function (res) {
            vm.list = res.data;
            setTimeout(function () {
                configDevice(res.data);
            }, 1000);

        });
    };

    var configDevice = function (data) {
        angular.forEach(data, function (device) {
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




        });
    };
    var grayImg = function (id, gray) {
        $('#device-img-' + id).css('filter', 'grayscale(' + gray + '%)');
        $('#device-img-' + id).css('-webkit-filter', 'grayscale(' + gray + '%)');
    };

    var updateState = function (id, state) {

        var data = { 'state': state };
        $http({
            method: 'POST',
            url: ipServer + '/device/updateState/' + id,
            data: data
        }).then(function () {
            console.log('estado atualizado');
        });
    };
    vm.updateState = function (id, state) {
        updateState(id, state);
    }
    init();
    var ping = function () {
        $http({
            method: 'GET',
            url: ipServer + '/device/pingByClient/' + client
        }).then(function (data) {
            find();

        });
    };

    // $interval(function () {
    //     if ($location.path() === '/device/index') {
    //         ping();
    //     } else {
    //         console.log('Stop');
    //     }
    // }, 10000);

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


});