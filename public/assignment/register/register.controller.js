"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        //console.log($location.url());

        function register() {
            var user = UserService.createUser($scope.username, $scope.password, $scope.email, console.log);
            $rootScope.user = user;
            $location.path('/profile'); // TODO: didn't work?
        }
    }
})();