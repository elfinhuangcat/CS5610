"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("UserListController", UserListController);

    function UserListController(UserService, $rootScope, $location)
    {
        var vm = this;
        vm.users = [];
        vm.admin = null;

        vm.upgrade = upgrade;
        vm.downgrade = downgrade;
        vm.resetPassword = resetPassword;

        function init() {
            if (isAdmin()) {
                vm.admin = $rootScope.user;
                UserService
                    .findAllUsers()
                    .then(function(users) {
                        vm.users = users;
                    });
            } else {
                $location.path("/");
            }
        }
        init();

        function isAdmin() {
            if ($rootScope.user != null || $rootScope.user != undefined) {
                return $rootScope.user.role == 'A';
            } else {
                return false;
            }
        }

        function upgrade(user) {
            if (user.role == 'R') {
                user.role = 'C';
                UserService
                    .updateUser(user._id, user)
                    .then(function (newUser) {
                        init();
                    });
            }
        }

        function downgrade(user) {
            if (user.role == 'C') {
                user.role = 'R';
                UserService
                    .updateUser(user._id, user)
                    .then(function (newUser) {
                        init();
                    });
            }
        }

        function resetPassword(user) {
            // reset password to default
            user.password = '88888888';
            UserService
                .updateUser(user._id, user)
                .then(function (newUser) {
                    init();
                });
        }
    }
})();