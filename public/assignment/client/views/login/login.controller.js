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
                    if (user != null){
                        $rootScope.user = user;
                        $location.path("/profile");
                    }
                    else {
                        window.alert("User information incorrect. Please enter again.");
                    }
                });
        }
    }
})();