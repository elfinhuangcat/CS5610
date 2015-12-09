"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("MessageReadController", MessageReadController);

    function MessageReadController($rootScope, MessageService, $location, UserService, $routeParams)
    {
        var vm = this;
        vm.user = null;
        vm.msg = null;
        vm.from = null; // The "from" to display
        vm.to = null; // The "to" to display
        vm.reply = reply;

        function init() {
            if (!isLoggedIn()) {
                $location.path("/");
            } else {
                vm.user = $rootScope.user;
                MessageService
                    .findMessageById($routeParams["id"])
                    .then(function(msg) {
                        if (msg != null) {
                            vm.msg = msg;
                            vm.msg.read = true;
                            if (vm.msg.from != vm.user.email && vm.msg.to != vm.user.email) {
                                $location.path("/message/inbox");
                            } else if (vm.msg.from == vm.user.email){
                                // User is "from"
                                vm.msg.from = vm.user;
                                vm.from = vm.user.name + " [" + vm.user.email + "]";
                                UserService
                                    .findUserByEmail(vm.msg.to)
                                    .then(function(user) {
                                        msg.to = user;
                                        vm.to = user.name + " [" + user.email + "]";
                                    });
                            } else {
                                // User is "to"
                                vm.msg.to = vm.user;
                                vm.to = vm.user.name + " [" + vm.user.email + "]";
                                UserService
                                    .findUserByEmail(vm.msg.from)
                                    .then(function(user) {
                                        msg.from = user;
                                        vm.from = user.name + " [" + user.email + "]";
                                    });
                            }
                        } else {
                            $location.path("/");
                        }
                    });
            }
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function reply() {
            $location.path("/message/compose").search("to", vm.msg.from.email).search("subject", "[Re]"+vm.msg.subject);
        }
    }
})();