"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope)
    {
        $scope.$location = $location;
        $scope.username = "Username"; // TODO: update username on header
        $scope.hasUser = hasUser;
        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            model.$location = "/home";
        }


        function hasUser() {
            if ($rootScope.user === undefined || $rootScope.user === null) {
                return false;
            }
            else {
                return true;
            }
        }
    }
})();