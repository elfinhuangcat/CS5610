"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService)
    {
        var model = this;
        model.$location = $location;
        model.register = register;

        function register() {
            if (register_check()) {
                var newUser = {
                    "username": model.username,
                    "password": model.password,
                    "email": model.email,
                    "firstName": "",
                    "lastName": ""
                };
                UserService
                    .createUser(newUser)
                    .then(function(user) {
                        $rootScope.user = user;

                        console.log("id- " + $rootScope.user.id);
                        console.log("username " + $rootScope.user.username);
                        console.log("password " + $rootScope.user.password);
                        console.log("first " + $rootScope.user.firstName);
                        console.log("last " + $rootScope.user.lastName);
                        console.log("email " + $rootScope.user.email);

                        $location.path("/profile");
                    });
            }
        }

        function register_check(){
            // 1. username is not empty:
            if (model.username == "" || model.username == undefined) {
                window.alert("WARNING - user name cannot be empty");
                return false;
            }
            // 2. password is not empty:
            else if (model.password =="" || model.password == undefined) {
                window.alert("WARNING - password cannot be empty");
                return false;
            }
            // 3. password should match:
            else if (model.password != model.verifypassword) {
                window.alert("WARNING - password not match");
                return false;
            }
            else {
                return true;
            }
        }
    }
})();