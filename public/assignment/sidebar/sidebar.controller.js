"use strict";
(function()
{
    angular
        .module("FormBuilderAppOld")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope)
    {
        $scope.$location = $location;

        $scope.adminHide = function () {
            return true; // For now the admin page is not implemented
        }

        $scope.profileHide = function() {
            return !hasUser();
        }

        $scope.formHide = function() {
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