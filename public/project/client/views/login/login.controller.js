"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService)
    {
        var vm = this;
        vm.$location = $location;
        vm.$rootScope = $rootScope;
        vm.isLoggedIn = isLoggedIn;
        vm.login = login;
        //vm.isAdmin = isAdmin;

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function login() {
            UserService
                .findUserByEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(user) {
                    if (user != null) {
                        $rootScope.user = user;
                        $location.path("/profile/" + user._id);
                    } else {
                        vm.errorMessage = "User Not Found.";
                    }
                });
        }

        /*
        function isAdmin() {
            if (isLoggedIn()) {
                return $rootScope.user.role == 'A';
            } else {
                return false;
            }
        }
        */
    }
})();