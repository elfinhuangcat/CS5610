"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        //console.log($location.url());
        var user = $rootScope.user;

        $scope.username = user.username;
        $scope.password = user.password;
        $scope.firstname = user.firstname;
        $scope.lastname = user.lastname;
        $scope.email = user.email;

        $scope.update = function() {
            var newUserInfo = {'username' : $scope.username,
                               'password' : $scope.password,
                               'firstname' : $scope.firstname,
                               'lastname' : $scope.lastname,
                               'email' : $scope.email};
            var newUser = UserService.updateUser(user.id, newUserInfo, console.log);
            $rootScope.user = newUser;
        }
    }
})();