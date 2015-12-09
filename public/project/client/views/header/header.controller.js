"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $rootScope)
    {
        var vm = this;
        vm.$location = $location;
        vm.$rootScope = $rootScope;
        vm.search = search;
        vm.isLoggedIn = isLoggedIn;
        vm.logout = logout;
        vm.isAdmin = isAdmin;
        vm.isContributor = isContributor;



        function search() {
            console.log("Search key: " + vm.searchKey); // vm.searchKey is the ng-model of search input
            // $location.path("/searchresult");
        }

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function logout() {
            $rootScope.user = null;
            $location.path("/");
        }

        function isAdmin() {
            if (isLoggedIn()) {
                return $rootScope.user.role == 'A';
            } else {
                return false;
            }
        }

        function isContributor() {
            if (isLoggedIn()) {
                return $rootScope.user.role == 'C';
            } else {
                return false;
            }
        }
    }
})();