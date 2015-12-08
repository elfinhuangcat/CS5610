"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService)
    {
        var vm = this;
        vm.$location = $location;
        vm.isLoggedIn = isLoggedIn;
        vm.register = register;

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function register() {
            // first check whether the passwords are same or not
            if (vm.form.password != vm.form.verifyPassword) {
                vm.errorMessage = "Passwords do not match. Please type again.";
            } else if (vm.form.email == "" || vm.form.email == null || vm.form.name == "" || vm.form.name == null || vm.form.password == "" || vm.form.password == null) {
                vm.errorMessage = "Please fill in all fields to sign up.";
            } else {
                // check if the user email exists
                UserService
                    .findUserByEmail(vm.form.email)
                    .then(function(user) {
                        if (user != null) {
                            vm.errorMessage = "The email address you input has already been registered. Please try again.";
                        } else {
                            // post new user
                            var user = {"email" : vm.form.email, "password" : vm.form.password, "name": vm.form.name};
                            UserService
                                .createUser(user)
                                .then(function(createdUser) {
                                    console.log("New user registered. User info: ");
                                    console.log(createdUser);
                                    $rootScope.user = createdUser; // log in
                                    $location.path("/profile/" + createdUser._id);
                                });
                        }
                    });
            }

        }
    }
})();