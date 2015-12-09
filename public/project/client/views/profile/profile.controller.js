"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService, $routeParams, ApplicationService)
    {
        //TODO: the user image is displayed always the same
        var vm = this;
        vm.$location = $location;
        vm.user = null; // current logged in user OR the user whose profile is being viewed

        vm.isOwnProfile = isOwnProfile;
        vm.isApplicationSubmitted = false;
        vm.update = update;
        vm.applyContribute = applyContribute;

        // If viewing other user's profile:
        vm.showFriendButton = true;
        vm.showUnfriendButton = false;
        vm.friend = friend;
        vm.unfriend = unfriend;

        function init() {
            if (isOwnProfile()) {
                vm.user = $rootScope.user;
                vm.showFriendButton = false;
                vm.showUnfriendButton = false;
                if (vm.user.role == 'R') {
                    ApplicationService
                        .findApplicationByEmail(vm.user.email)
                        .then(function(result) {
                            if (result != null) {
                                vm.isApplicationSubmitted = true;
                            }
                        });
                }
            } else {
                UserService
                    .findUserById($routeParams["id"])
                    .then(function(user) {
                        vm.user = user; // WARNING: vm.user is not necessarily current user
                        if (isLoggedIn()) {
                            for (var i = 0; i < $rootScope.user.friends.length; ++i) {
                                if (vm.user.email == $rootScope.user.friends[i]) {
                                    vm.showFriendButton = false;
                                    vm.showUnfriendButton = true;
                                    break;
                                }
                            }
                        } else {
                            vm.showFriendButton = false;
                            vm.showUnfriendButton = false;
                        }
                    });
            }
        }
        init();

        function isOwnProfile() {
            if ($rootScope.user == null || $rootScope.user == undefined) {
                return false;
            } else {
                return ($rootScope.user._id == $routeParams["id"]);
            }
        }

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function update() {
            // Only logged in user can invoke this function
            UserService
                .updateUser($rootScope.user._id, vm.user)
                .then(function(newUser) {
                    vm.user = newUser;
                });
            vm.updateSuccess = "Your profile has been successfully updated!";
        }

        function applyContribute() {
            //jump to another page.
            $location.path("/profile/" + vm.user._id + "/applycontributor")
        }

        function friend() {
            // add another user to the current user's friend list
            var user = $rootScope.user;
            user.friends.push(vm.user.email);
            UserService
                .updateUser(user._id, user)
                .then(function(newUser) {
                    if (newUser != null) {
                        $rootScope.user = newUser;
                        vm.showFriendButton = false;
                        vm.showUnfriendButton = true;
                    }
                });
        }
        function unfriend() {
            // remove the user from the current user's friend list
            var user = $rootScope.user;
            for (var i = 0; i < user.friends.length; ++i) {
                if (user.friends[i] == vm.user.email) {
                    user.friends.splice(i,1);
                    break;
                }
            }
            UserService
                .updateUser(user._id, user)
                .then(function(newUser) {
                    if (newUser != null) {
                        $rootScope.user = newUser;
                        vm.showFriendButton = true;
                        vm.showUnfriendButton = false;
                    }
                });
        }
    }
})();