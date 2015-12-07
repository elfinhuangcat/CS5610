"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("ApplyContributorController", ApplyContributorController);

    function ApplyContributorController($location, $rootScope, ApplicationService)
    {
        var vm = this;
        vm.$location = $location;
        vm.user = $rootScope.user;

        vm.isLoggedIn = isLoggedIn;
        vm.login = login;
        vm.isAdmin = isAdmin;
        vm.apply = apply;
        vm.showForm = true;

        function init() {
            if (!isLoggedIn()) {
                vm.showForm = false;
            } else if (vm.user.role == "C" || vm.user.role == "A") {
                vm.showForm = false;
            } else {
                ApplicationService
                    .findApplicationByEmail(vm.user.email)
                    .then(function(result) {
                        if (result != null) {
                            vm.showForm = false;
                        }
                    });
            }
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function apply() {
            if (isLoggedIn()) {
                // first check if the user agrees the rules
                if (vm.form.agree != true) {
                    vm.errorMessage = "Please agree the rules before applying.";
                } else if (vm.form.reasons == null || vm.form.reasons == ""){
                    // check if reasons are empty.
                    vm.errorMessage = "Please fill in the reasons before applying.";
                } else {
                    ApplicationService
                        .createApplication({"applicant":vm.user.email, "content":vm.form.reasons})
                        .then(function (application) {
                            console.log("Application created: ");
                            console.log(application);
                            $location.path("/profile/" + vm.user._id);
                        });
                }
            }
        }
        function isAdmin() {
            if (isLoggedIn()) {
                return $rootScope.user.role == 'A';
            } else {
                return false;
            }
        }
    }
})();