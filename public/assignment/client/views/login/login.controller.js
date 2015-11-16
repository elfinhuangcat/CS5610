"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService)
    {
        var model = this;
        model.$location = $location;

        model.login = function() {
            UserService
                .findUserByUsernameAndPassword(model.username, model.password)
                .then(function(user) {
                    $rootScope.user = user;
                    $location = "/profile";
                });
        }
    }
})();