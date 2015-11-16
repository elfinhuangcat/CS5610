"use strict";
(function()
{
    angular
        .module("FormBuilderAppOld")
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
            UserService.updateUser($rootScope.user.id, newUserInfo, user_update);
        }

        /**
         * @param user - user object with updated information
         */
        function user_update(user) {
            $rootScope.user = user;
            $scope.username = $rootScope.user.username;
            $scope.password = $rootScope.user.password;
            $scope.firstname = $rootScope.user.firstname;
            $scope.lastname = $rootScope.user.lastname;
            $scope.email = $rootScope.user.email;
        }
    }
})();