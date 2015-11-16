"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $rootScope)
    {
        var model = this;
        model.$location = $location;
        model.username = null;

        model.logout = function() {
            $rootScope.user = null;
            model.$location = "/home";
        }

        console.log($location.url().indexOf('register'));


        model.hasUser = function() {
            if ($rootScope.user === undefined || $rootScope.user === null) {
                return false;
            }
            else {
                return true;
            }
        }
    }
})();