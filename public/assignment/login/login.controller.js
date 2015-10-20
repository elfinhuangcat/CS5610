"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        //console.log($location.url());

        function login() {
            var user = UserService.findUserByUsernameAndPassword($scope.username, $scope.password, console.log);
            $rootScope.user = user;
            $location.path('/profile'); // TODO: didn't work?
        }
    }
})();