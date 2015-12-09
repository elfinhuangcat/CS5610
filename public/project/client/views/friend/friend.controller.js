"use strict";
(function(){
    angular
        .module("RecipesComApp")
        .controller("FriendController", FriendController);

    function FriendController($rootScope, $location, UserService) {
        var vm = this;
        vm.user = $rootScope.user;
        vm.friends = []; // list of recipes bookmarked by the current user
        vm.unfriend = unfriend;
        vm.sendMsg = sendMsg;

        function init() {
            if (!isLoggedIn() || vm.user.role == 'A') {
                $location.path("/");
            } else {
                // find the friends objects:
                vm.user.friends.forEach(function(user_email) {
                    UserService
                        .findUserByEmail(user_email)
                        .then(function (friend) {
                            vm.friends.push(friend);
                        });
                });
            }
        }
        init();

        function unfriend(friendEmail) {
            // modify the vm.user object:
            for (var i = 0; i < vm.user.friends.length; ++i) {
                if (vm.user.friends[i] == friendEmail) {
                    vm.user.friends.splice(i, 1);
                    break;
                }
            }

            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function(newUser) {
                    $rootScope.user = newUser;
                    vm.user = newUser;
                    vm.friends = [];
                    init();
                });
        }

        function sendMsg() {
            // TODO: jump to the message page
        }


        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }
    }
})();