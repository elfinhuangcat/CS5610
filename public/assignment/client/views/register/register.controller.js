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
                        model.$location = "/profile";
                    });
            }
        }

        /**
         * @returns true if info is valid
         *          false if info is not valid (and windows will pop up)
         */
        function register_check(){
            // 1. username is not empty:
            if (model.username == "") {
                window.alert("WARNING - user name cannot be empty");
                return false;
            }
            // 2. password is not empty:
            else if (model.password =="") {
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