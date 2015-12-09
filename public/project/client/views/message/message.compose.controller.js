"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageComposeController", MessageComposeController);

    function MessageComposeController($rootScope, MessageService, $location, UserService, $routeParams)
    {
        var vm = this;
        vm.user = null;
        vm.$location = $location;

        // Compose:
        vm.composeReceiver = "";
        vm.composeSubject = "";
        vm.composeContent = "";
        vm.composeToError = false;

        vm.sendMsg = sendMsg;

        function init() {
            if (!isLoggedIn()) {
                $location.path("/");
            } else {
                vm.user = $rootScope.user;
                if ($routeParams["to"] != undefined) {
                    vm.composeReceiver = $routeParams["to"];
                }
                if ($routeParams["subject"] != undefined) {
                    vm.composeSubject = $routeParams["subject"];
                }
                console.log("vm.composeReceiver: " + vm.composeReceiver);
                console.log("vm.composeSubject: " + vm.composeSubject);
            }
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function sendMsg() {
            // Add the following to the Application collection
            //vm.composeReceiver
            //vm.composeSubject
            //vm.composeContent
            // check : composeToError
            UserService
                .findUserByEmail(vm.composeReceiver)
                .then(function(result) {
                    if (result) {
                        // receiver exists:
                        var newMsg = {
                            from : vm.user.email,
                            to   : vm.composeReceiver,
                            subject: vm.composeSubject,
                            body: vm.composeContent
                        };
                        MessageService
                            .createMessage(newMsg)
                            .then(function(msg) {
                                if (msg) {
                                    vm.composeToError = false;
                                    vm.composeContent = "";
                                    vm.composeReceiver = "";
                                    vm.composeSubject = "";
                                }
                            });
                    } else {
                        vm.composeToError = true;
                    }
                });
        }
    }
})();