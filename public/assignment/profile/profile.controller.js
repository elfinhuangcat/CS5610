"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",  ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        console.log("Entered profile controller.");
        console.log($location.url());

        $scope.username = $rootScope.user.username;
        $scope.password = $rootScope.user.password;
        $scope.firstname = $rootScope.user.firstname;
        $scope.lastname = $rootScope.user.lastname;
        $scope.email = $rootScope.user.email;

        $scope.update = function() {
            var newUserInfo = {'username' : $scope.username,
                               'password' : $scope.password,
                               'firstname' : $scope.firstname,
                               'lastname' : $scope.lastname,
                               'email' : $scope.email};
            var newUser = UserService.updateUser($rootScope.user.id, newUserInfo,
                                                 function(user) {
                                                     console.log("User updated. User Id: " + user.id);
                                                 });
            $rootScope.user = newUser;
            console.log("New user info: \nusername: " + $rootScope.user.username + "\n" +
                        "password: " + $rootScope.user.password + "\n" +
                        "firstname: " + $rootScope.user.firstname + "\n" +
                        "lastname: " + $rootScope.user.lastname + "\n" +
                        "email: " +$rootScope.user.email);
        }
    }
})();