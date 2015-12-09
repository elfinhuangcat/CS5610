"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageComposeController", MessageComposeController);

    function MessageComposeController($rootScope, MessageService, $location, UserService)
    {
        var vm = this;
        vm.user = null;
        vm.sent = null;
        vm.received = null;
        vm.$location = $location;
        vm.messageToRead = null;

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
                initSent();
                initReceived();
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
                                    initSent();
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

        function initSent() {
            // init vm.sent:
            MessageService
                .findOutMessageForUserByEmail(vm.user.email)
                .then(function(msgs) {
                    msgs.forEach(function(msg) {
                        msg.selected = false; // to use the checkbox
                        /*
                        UserService
                            .findUserByEmail(msg.to)
                            .then(function(user) {
                                msg.to = user; //TODO DANGEROUS : ASYNCHRONOUS
                            });
                            */

                    });
                    vm.sent = msgs;
                    console.log(vm.sent);
                });
        }

        function initReceived() {
            // init vm.received
            MessageService
                .findInMessageForUserByEmail(vm.user.email)
                .then(function(msgs) {
                    msgs.forEach(function(msg) {
                        msg.selected = false;
                        /*
                        UserService
                            .findUserByEmail(msg.from)
                            .then(function(user) {
                                msg.from = user; //TODO DANGEROUS : ASYNCHRONOUS
                            });
                            */

                    });
                    vm.received = msgs;
                    if (vm.received.length > 0) {
                        vm.messageToRead = msgs[0];
                    }
                });
        }
    }
})();