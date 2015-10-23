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
            $rootScope.user = user;
            $location.path('/profile');
        }
    }
})();