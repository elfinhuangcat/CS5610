"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageInboxController", MessageInboxController);

    function MessageInboxController($rootScope, MessageService, $location, UserService)
    {
        var vm = this;
        vm.user = null;
        vm.received = null;
        vm.$location = $location;
        vm.removeMsgs = removeMsgs;

        function init() {
            if (!isLoggedIn()) {
                $location.path("/");
            } else {
                vm.user = $rootScope.user;
                initReceived();
            }
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function initReceived() {
            // init vm.received
            MessageService
                .findInMessageForUserByEmail(vm.user.email)
                .then(function(msgs) {
                    msgs.forEach(function(msg) {
                        msg.selected = false;
                         UserService
                         .findUserByEmail(msg.from)
                         .then(function(user) {
                         msg.from = user;
                         });

                    });
                    vm.received = msgs;
                });
        }

        function removeMsgs() {
            for (var i = 0; i < vm.received.length; ++i) {
                if (vm.received[i].selected) {
                    MessageService
                        .deleteMessageById(vm.received[i]._id)
                        .then(function (result) {
                            console.log(result);
                        });
                }
            }
            initReceived();
        }
    }
})();