"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        console.log($location.url());

        $scope.login = function() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, user_login);
        }

        function user_login(user) {
            if (user == null) {
                alert("Username or password incorrect.");
            }
            else {
                $rootScope.user = user;
                $location.path('/profile');
            }
        }
    }
})();