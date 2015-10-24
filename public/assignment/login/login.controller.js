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
            var user = UserService.findUserByUsernameAndPassword($scope.username, $scope.password,
                                                                 function(info) {
                                                                     console.log(info);
                                                                 });
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