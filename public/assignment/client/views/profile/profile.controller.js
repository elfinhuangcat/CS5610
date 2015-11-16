"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",  ProfileController);

    function ProfileController($rootScope, $location, UserService)
    {
        var model = this;
        model.$location = $location;
        model.update = update;

        function init(){
            model.username = $rootScope.user.username;
            model.password = $rootScope.user.password;
            model.firstname = $rootScope.user.firstName;
            model.lastname = $rootScope.user.lastName;
            model.email = $rootScope.user.email;
        }
        init();



        function update() {
            var newUserInfo = {'username' : model.username,
                               'password' : model.password,
                               'firstName' : model.firstname,
                               'lastName' : model.lastname,
                               'email' : model.email};
            UserService
                .updateUser($rootScope.user.id, newUserInfo)
                .then(function(new_user) {
                    $rootScope.user = new_user;

                    model.username = $rootScope.user.username;
                    model.password = $rootScope.user.password;
                    model.firstName = $rootScope.user.firstName;
                    model.lastName = $rootScope.user.lastName;
                    model.email = $rootScope.user.email;
                });
        }
    }
})();