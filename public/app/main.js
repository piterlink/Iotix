var App = angular.module('IotixApp', ['ngRoute', 'oc.lazyLoad', 'ngStorage', 'ngCookies','chart.js']);
var autentication = true;

App.factory('server', function getIp() {
    server = {
        // ip: 'http://192.168.0.110:3000'
        ip: 'http://192.168.0.15:3000'
        // ip: 'http://localhost:3000'
    };
    return server;
});

App.config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard/index', {
            templateUrl: 'views/dashboard/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/dashboard/DashboardIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/history/index', {
            templateUrl: 'views/history/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/history/HistoryIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/client/index', {
            templateUrl: 'views/client/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/client/ClientIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/site/login', {
            templateUrl: 'views/site/login.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/site/SiteLoginController.js');
                }]
            }
        })
        .when('/client/create', {
            templateUrl: 'views/client/create.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/client/ClientCreateController.js');
                }]
            },
            auth: autentication
        })
        .when('/client/update/:id', {
            templateUrl: 'views/client/update.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/client/ClientUpdateController.js');
                }]
            },
            auth: autentication
        })


        .when('/user/index', {
            templateUrl: 'views/user/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/user/UserIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/user/create', {
            templateUrl: 'views/user/create.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/user/UserCreateController.js');
                }]
            },
            auth: autentication
        })
        .when('/user/update/:id', {
            templateUrl: 'views/user/update.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/user/UserUpdateController.js');
                }]
            },
            auth: autentication
        })
        .when('/category/index', {
            templateUrl: 'views/category/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/category/CategoryIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/category/create', {
            templateUrl: 'views/category/create.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/category/CategoryCreateController.js');
                }]
            },
            auth: autentication
        })
        .when('/category/update/:id', {
            templateUrl: 'views/category/update.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/category/CategoryUpdateController.js');
                }]
            },
            auth: autentication
        })
        .when('/hardware/index', {
            templateUrl: 'views/hardware/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/hardware/HardwareIndexController.js');
                }]
            },
            auth: autentication
        })
        .when('/hardware/create', {
            templateUrl: 'views/hardware/create.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/hardware/HardwareCreateController.js');
                }]
            },
            auth: autentication
        })
        .when('/hardware/update/:id', {
            templateUrl: 'views/hardware/update.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/hardware/HardwareUpdateController.js');
                }]
            },
            auth: autentication
        })
        .when('/device/index', {
            templateUrl: 'views/device/index.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './app/controllers/device/DeviceIndexController.js',
                        './plugin/ion.rangeSlider/css/ion.rangeSlider.css',
                        './plugin/ion.rangeSlider/css/ion.rangeSlider.skinHTML5.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinModern.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinNice.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinSimple.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css',
                        './css/slider.css',
                        //                                './plugin/farbtastic-master/src/farbtastic.js',
                        './plugin/ion.rangeSlider/js/ion-rangeSlider/ion.rangeSlider.js'
                    ]);
                }]
            },
            auth: autentication
        })
        .when('/device/admin', {
            templateUrl: 'views/device/admin.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './app/controllers/device/DeviceAdminController.js'
                    ]);
                }]
            },
            auth: autentication
        })
        .when('/device/create', {
            templateUrl: 'views/device/create.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/device/DeviceCreateController.js');
                }]
            },
            auth: autentication
        })
        .when('/device/view/:id', {
            templateUrl: 'views/device/view.html',
            //controller: 'mainController',
           resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        './app/controllers/device/DeviceViewController.js',
                        './plugin/ion.rangeSlider/css/ion.rangeSlider.css',
                        './plugin/ion.rangeSlider/css/ion.rangeSlider.skinHTML5.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinModern.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinNice.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinSimple.css',
                        //                                './plugin/ion.rangeSlider/css/ion.rangeSlider.skinFlat.css',
                        './css/slider.css',
                        //                                './plugin/farbtastic-master/src/farbtastic.js',
                        './plugin/ion.rangeSlider/js/ion-rangeSlider/ion.rangeSlider.js'
                    ]);
                }]
            },
            auth: autentication
        }) 
        .when('/device/update/:id', {
            templateUrl: 'views/device/update.html',
            //controller: 'mainController',
            resolve: {
                loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('./app/controllers/device/DeviceUpdateController.js');
                }]
            },
            auth: autentication
        })
        .otherwise({
            redirectTo: '/device/index'
        });

})
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .factory('Auth', function ($localStorage) {
        return {
            getToken: function () {
                return $localStorage.token;
            },
            setToken: function (_token) {
                $localStorage.token = _token;
            },
            setDados: function (data) {
                if (data != null) {
                    $localStorage.name = data.data.name,
                        $localStorage.clientId = data.data.client,
                        $localStorage.clientName = data.data.clientName,
                        $localStorage.name = data.data.username,
                        $localStorage.userLogged = true;
                }
            },
            getDados: function () {
                return {
                    name: $localStorage.name,
                    clientId: $localStorage.clientId,
                    clientName: $localStorage.clientName,
                    name: $localStorage.name,
                    userLogged: $localStorage.userLogged
                }
            }
        }
    })
    .run(function ($rootScope, $location, Auth) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next.auth) {
                if (!Auth.getToken()) {
                    $rootScope.$evalAsync(function () {
                        $location.path('/site/login')
                    });
                }
            }
        })
    })
    .run(function ($rootScope, $location) {
        $rootScope.location = $location;
    })
    .factory('AuthInterceptor', function ($location, Auth, $q) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if (Auth.getToken()) {
                config.headers['Authorization'] = 'Bearer ' + Auth.getToken();
            }

            return config;
        },

        responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
                $location.path('/site/login');
            }

            return $q.reject(response);
        }
    }
})