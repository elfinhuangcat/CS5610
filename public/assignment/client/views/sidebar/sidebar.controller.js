"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $rootScope)
    {
        var model = this;
        model.$location = $location;
        model.hasUser = hasUser;
        model.adminHide = adminHide;

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