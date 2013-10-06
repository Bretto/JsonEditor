'use strict';

var directives = angular.module('App.directives', []);



directives.directive('nodeEditor', function ($log) {

    function link($scope, element, attrs) {
        $log.info('nodeEditor')
    }

    return {
        restrict: 'A',
        link: link,
        scope: {},
        templateUrl: 'partials/node-editor.html',
        controller: function($scope, $element) {
            var nodes = $scope.nodes = [{}];
            var json = $scope.json = '';

            this.newNode = function(node) {
                $log.info('newNode');
                var data = {};
                data[node.key] = node.value;
                nodes.push(data);

                $scope.json = JSON.stringify(angular.copy(nodes));
//                $scope.$digest();
            }




        }
    };
});


directives.directive('nodeData', function ($log) {

    function link(scope, element, attrs, ctrl) {
        $log.info('nodeData')

        scope.newNode = function(){
            ctrl.newNode(scope.node);
        }

    }

    return {
        require: '^nodeEditor',
        restrict: 'A',
        templateUrl: 'partials/node-data.html',
        link: link,
        scope: {key:'=', value:'='}
    };
});


directives.directive('ngEnter', function ($log) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            $log.info('keydown');
            if(event.which === 13) {

                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

directives.directive('autoFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.autoFocus, function () {
                $timeout( function () {
                    element[0].focus();
                    scope.$digest();
                },0);
            }, true);
        }
    };
});

