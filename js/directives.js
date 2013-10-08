'use strict';

var directives = angular.module('App.directives', []);


directives.directive('nodeList', function ($log, $compile) {

    function link(scope, element, attrs) {
        $log.info('nodeList')

        scope.$watch(function () {
            return scope.nodes
        }, function () {
            scope.toJSON(scope.nodes);
        }, true);

        scope.toJSON = function(nodes){
//
            var arr = [];
            angular.forEach(nodes, function(node){
                var d = {};
                //d[data.key] = data.value;
                arr.push(d)
            })

            return 'ok';
        }
    }



    return {
        restrict: 'A',
        link: link,
        scope: {nodes:'='},
        templateUrl: 'partials/node-list.html'
//        controller: function($scope, $element) {
//
//        }
    };
});


directives.directive('nodeItem', function ($log, $compile) {

    function link(scope, element, attrs) {
        $log.info('nodeItem');
        scope.toJSON = function(){
            var arr = [];
                angular.forEach(node, function(data){
                    var d = {};
                    d[data.key] = data.value;
                    arr.push(d)
                })
            return JSON.stringify(arr);
        }
    }


    return {
        restrict: 'A',
        link: link,
//        scope: {node:'='},
        templateUrl: 'partials/node-item.html',
        controller: function ($scope, $element) {
//            $scope.node = [{}];
//            $scope.json = '';

//            $scope.$watch(function(){return $scope.node}, function(){
//                renderJson($scope.node);
//            },true)

            this.newData = function (data) {
                $log.info('newData 1');
                var d = data || {};
                $scope.node.push(d);
            }
//
            this.deleteData = function (data) {
                $log.info('deleteData');
                var i = $scope.node.indexOf(data);
                if (i > 0)$scope.node.splice(i, 1);
            }



//            function renderJson(node){
//
//                var arr = [];
//                angular.forEach(node, function(data){
//                    var d = {};
//                    d[data.key] = data.value;
//                    arr.push(d)
//                })
//
//                $scope.json = JSON.stringify(arr);
//                $scope.children = $scope.node;
//            }
        }
    };
});


directives.directive('nodeData', function ($log, $compile) {

    function link(scope, element, attrs, ctrl) {
        $log.info('nodeData')


        var data = scope.data();
//        if(angular.isArray(data.value)){
//            data.value = data.value[0];
//        }

        scope.data = data;

        scope.newData = function () {
//            $log.info('newData3s');
            ctrl.newData();
        }

        scope.deleteData = function () {
            ctrl.deleteData(scope.data);
        }

        if (scope.data.key === 'children') {
            $log.info('children')

//            var newElement = angular.element('<div node-item></div>');
            var newElement = angular.element("<div node-list nodes='nodes'></div>");

            var newScope = scope.$new();
            newScope.nodes = scope.data.value;
            $compile(newElement)(newScope, function (clonedElement, scope) {
                //attach the clone to DOM document at the right place
//                console.log(clonedElement, scope);
                element.find('.value').replaceWith(clonedElement);
            });
        }

    }

    return {
        require: '^nodeItem',
        restrict: 'A',
        scope: {data: '&'},
        templateUrl: 'partials/node-data.html',
        link: link
    };
});


directives.directive('ngEnter', function ($log) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            if (event.which === 13) {

                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

directives.directive('ngDelete', function ($log) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            if (event.which === 8) {

                if (scope.data.key === undefined || scope.data.key.length === 0) {

                    scope.$apply(function () {
                        scope.$eval(attrs.ngDelete);
                    });
                    event.preventDefault();
                }

            }
        });
    };
});

directives.directive('autoFocus', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.autoFocus, function () {
                $timeout(function () {
                    element[0].focus();
                    scope.$digest();
                }, 0);
            }, true);
        }
    };
});

