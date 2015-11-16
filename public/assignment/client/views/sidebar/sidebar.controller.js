"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope)
    {
        $scope.$location = $location;
        $scope.hasUser = hasUser;
        $scope.adminHide = adminHide;

        function adminHide() {
            return true; // For now the admin page is not implemented
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