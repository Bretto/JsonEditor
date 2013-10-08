'use strict';

var directives = angular.module('App.directives', []);


directives.directive('nodeMaster', function ($log, $compile) {

    function link(scope, element, attrs) {
        console.log('test')
    }

    return {
        restrict: 'A',
        link: link,
        templateUrl: 'partials/node-master.html',
        scope: {nodes:'='}
    };
});


directives.directive('nodeList', function ($log, $compile) {

    function link(scope, element, attrs) {
        console.log('test')
    }

    return {
        scope:true,
        restrict: 'A',
        link: link,
//        scope: {nodes:'='},
        templateUrl: 'partials/node-list.html'
//        controller: function($scope, $element) {
//
//        }
    };
});


directives.directive('nodeItem', function ($log, $compile) {

    function link(scope, element, attrs) {
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

            this.newData = function (data) {
                var d = data || {};
                $scope.node.push(d);
            }

            this.newChild = function () {
                var d = data || {};
                $scope.node.push(d);
            }
//
            this.deleteData = function (data) {
                var i = $scope.node.indexOf(data);
                if (i > 0)$scope.node.splice(i, 1);
            }

        }
    };
});


directives.directive('nodeData', function ($log, $compile) {

    function link(scope, element, attrs, ctrl) {

        var data = scope.data();

        scope.data = data;

        scope.newData = function (str) {

            if(str === 'children'){
//                ctrl.newChild();
                newChild();
            } else{
                ctrl.newData();
            }
        }

        scope.deleteData = function () {
            ctrl.deleteData(scope.data);
        }

        function newChild(){
            var newElement = angular.element("<div node-list nodes='nodes'></div>");

            var newScope = scope.$new();
            var nodesData = [[{"key":"key","value":"value"}]];
            if(angular.isArray(scope.data.value)){
                nodesData = scope.data.value;
            }
            newScope.nodes = nodesData;
            scope.data.value = newScope.nodes;

            $compile(newElement)(newScope, function (clonedElement, scope) {
                element.find('.value').replaceWith(clonedElement);
            });
        }

        if (scope.data.key === 'children') {
            console.log('new Children');
            newChild();
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

