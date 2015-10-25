"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope)
    {
        $scope.$location = $location;

        $scope.logout = function() {
            $rootScope.user = null;
        }

        $scope.registerHide = function() {
            return hasUser();
        }

        $scope.loginHide = function() {
            return hasUser();
        }

        $scope.logoutHide = function() {
            return !hasUser();
        }

        $scope.usernameHide = function() {
            return !hasUser();
        }

        function hasUser() {
            if ($rootScope.user == undefined || $rootScope.user == null) {
                return false;
            }
            else {
                return true;
            }
        }
    }
})();