'use strict';
/* App Controllers */

var controllers = angular.module('App.controllers', []);

controllers.controller('AppCtrl', function ($scope, $rootScope, $timeout, $log, $http, DataModel) {
    $log.log('AppCtrl');


    // desing issue do we want properties or arrays
    var data = [
        {
            name: 'brett',
            children: [
                {
                    test: 'ok'
                }
            ]
        }
    ];


    function toNodeList(data) {

        function toArray(data) {
            var a = [];
            angular.forEach(data, function (obj) {
                a.push(toKeyValue(obj));
            })

            return a;
        }


        function toKeyValue(obj) {

            var a = [];

            for (var key in obj) {
                if (angular.isArray(obj[key])) {
                    a.push({key: key, value: toArray(obj[key])});
                } else {
                    a.push({key: key, value: obj[key]});
                }
            }

            return a;
        }

        var test = toArray(data);

        return test;
    }

    function toJson(nodes) {


//        function iterArr(arr) {
//
//            var a = [];
//
//            angular.forEach(arr, function (obj) {
//                var d = {};
//
//                if (angular.isArray(obj)) {
//                    iterArr(obj);
//                } else {
//
//                    if (angular.isArray(obj.value)){
//                        d[obj.key] = iterArr(obj.value);
//                    }else{
//                        d[obj.key] = obj.value;
//                    }
//                    a.push(d);
//                }
//            });
//
//            return a;
//        }
////
//        var arr = iterArr(nodes);
//        var test = JSON.stringify(angular.copy(arr));
////        var x = eval(test);
//        return test;


        function toArray(data, obj) {
            var a = [];
            var o = obj || {};


            angular.forEach(data, function (item) {
                console.log(JSON.stringify(item));
                if (angular.isArray(item)) {
                    //toArray(item, o);
                    var res = toObject2(item, o)
                    a.push(res);
                } else {
                    var res = toObject(item, o)
                    a.push(res);
                }
            })

            return a;
        }


        function toObject2(arr) {
            var o = {};
            angular.forEach(arr, function (obj) {

                if (angular.isArray(obj.value)) {
                    o[obj.key] = toArray(obj.value)
                } else {
                    o[obj.key] = obj.value;
                }
            });

            return o;
        }


        function toObject(obj, o) {

            if (angular.isArray(obj.value)) {

                var res = toArray(obj.value, o);
                o[obj.key] = res;

                return o;
            } else {
                o[obj.key] = obj.value;
                return o;
            }

//            for (var key in obj) {
//                if (angular.isArray(obj[key])) {
//                    o[obj.key] = toArray(obj.value);
//                } else {
//                    o[obj.key] = obj.value;
//                }
//                a.push(o);
//            }

        }

        var test = toArray(nodes);

        return JSON.stringify(test);

    }


    var test = toNodeList(data);
//        $log.info(test);

    $scope.nodes = test;



//        $scope.nodes = [
//            [
//                {key: 'name', value: 'brett'},
//                {key: 'children', value: [
//                    {key: 'name', value: 'zoe'}
//                ]
//                }
//            ]
//        ]

//        $scope.nodes = [
//            [
//                {key: 'name', value: 'brett'},
//                {key: 'children', value: [
//                    {key: 'name', value: 'zoe'}
//                ]
//                }
//            ],
//
//            [
//                {key: 'name', value: 'brett'},
//                {key: 'children', value: [
//                    {key: 'name', value: 'zoe'}
//                ]
//                }
//            ]
//        ]

    $scope.doIt = function(){
        var test = toNodeList(eval(toJson(angular.copy($scope.nodes))));
        $scope.json = test;
    }

});

