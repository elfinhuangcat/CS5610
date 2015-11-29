"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope)
    {
        $scope.$location = $location;
        $scope.username = null;
        $scope.$rootScope = $rootScope;

        $scope.hasUser = hasUser;
        $scope.logout = logout;

        function logout() {
            delete $rootScope.user;
            $location.path("/home");
            $scope.$location = $location;
            $scope.username = null;
        }


        function hasUser() {
            if ($rootScope.user === undefined || $rootScope.user === null) {
                return false;
            }
            else {
                $scope.username = $rootScope.user.username;
                return true;
            }
        }
    }
})();