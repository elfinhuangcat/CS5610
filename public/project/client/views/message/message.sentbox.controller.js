"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageSentboxController", MessageSentboxController);

    function MessageSentboxController($rootScope, MessageService, $location, UserService)
    {
        var vm = this;
        vm.user = null;
        vm.sent = null;
        vm.$location = $location;
        vm.removeMsgs = removeMsgs;

        function init() {
            if (!isLoggedIn()) {
                $location.path("/");
            } else {
                vm.user = $rootScope.user;
                initSent();
            }
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function initSent() {
            // init vm.sent:
            MessageService
                .findOutMessageForUserByEmail(vm.user.email)
                .then(function(msgs) {
                    msgs.forEach(function(msg) {
                        msg.selected = false; // to use the checkbox

                         UserService
                         .findUserByEmail(msg.to)
                         .then(function(user) {
                         msg.to = user;
                         });
                    });
                    vm.sent = msgs;
                    console.log("Sent msgs:");
                    console.log(vm.sent);
                });
        }

        function removeMsgs() {
            for (var i = 0; i < vm.sent.length; ++i) {
                if (vm.sent[i].selected) {
                    MessageService
                        .deleteMessageById(vm.sent[i]._id)
                        .then(function (result) {
                            console.log(result);
                        });
                }
            }
            initSent();
        }
    }
})();