var AccMgt = angular.module('AccMgt',['ngRoute','ngDialog']);

    AccMgt.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
            templateUrl: 'templates/counter.html',
            controller:'counter'
        })
            .when('/welcome', {
                templateUrl: 'templates/Welcome.html',
                controller:'welcome'
            })
            .when('/signUp', {
                templateUrl:'templates/SignUp.html',
                controller: 'signUp'
            })
            .when('/signIn', {
                templateUrl:'templates/SignIn.html',
                controller:'signIn'
            })
            .when('/dashBoard', {
                templateUrl:'templates/SummeryPage.html',
                controller:'summeryPage'
            })
            .when('/newAccount', {
                templateUrl:'templates/NewAccount.html',
                controller:'newAccount'
            })
            .when('/allEntries/:accountID', {
                templateUrl:'templates/AllEntry.html',
                controller:'allEntries'
            })
            .otherwise({
                redirectTo:"/"
            })
    }]).

    directive('match', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                match: '='
            },
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
                    return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('match', currentValue);
                });
            }
        };
    });


    /*AccMgt.controller('navController', function($scope){
        // function to submit the form after all validation has occurred

    })*/