'use strict';
/* App Controllers */

var controllers = angular.module('App.controllers', []);

controllers.controller('AppCtrl', function ($scope, $rootScope, $timeout, $log, $http, DataModel) {
    $log.log('AppCtrl');


    // desing issue do we want properties or arrays
    var data = [
        {
            name: 'brett'
//            children: [
//                {
//                    test: 'ok'
//                }
//            ]
        },
        {
            name: 'brett'
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

        function toArray(data, obj) {
            var a = [];
            var o = obj || {};


            angular.forEach(data, function (item) {
                if (angular.isArray(item)) {
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

        }

        var test = toArray(nodes);

        return JSON.stringify(test);

    }


    var test = toNodeList(data);
//        $log.info(test);

    $scope.nodesTest = test;


    var nodesCache = null;
    $scope.getJsonData = function(){

        var data = toNodeList(JSON.parse(toJson(angular.copy($scope.nodesTest))));
        if(!angular.equals(nodesCache, data)){
            nodesCache = data;
        }

        return nodesCache;
    }



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
        var test = toNodeList(JSON.parse(toJson(angular.copy($scope.nodes))));
        $scope.json = test;
    }

});

