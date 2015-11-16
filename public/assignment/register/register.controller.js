"use strict";
(function()
{
    angular
        .module("FormBuilderAppOld")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;

        $scope.register = function() {
            console.log("NG-CLICK REGISTER()");
            UserService.createUser({"username": $scope.username, "password": $scope.password, "email": $scope.email},
                                   user_register);

        }

        function user_register(user) {
            $rootScope.user = user;
            $location.path('/profile');
        }
    }
})();