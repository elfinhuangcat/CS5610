"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("ContAppController", ContAppController);

    function ContAppController(ApplicationService, UserService, MessageService, $rootScope, $location)
    {
        var vm = this;
        vm.apps = [];
        vm.admin = null;

        vm.approve = approve;
        vm.decline = decline;

        function init() {
            if (isAdmin()) {
                vm.admin = $rootScope.user;
                ApplicationService
                    .findAllApplications()
                    .then(function(applications) {
                        vm.apps = applications;
                        vm.apps.forEach(function(application) {
                            UserService
                                .findUserByEmail(application.applicant)
                                .then(function(user) {
                                    application.applicant = user;
                                });
                        });
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

        function approve(app) {
            app.applicant.role = 'C';
            UserService
                .updateUser(app.applicant._id, app.applicant)
                .then(function(user) {
                    MessageService
                        .createMessage({
                            from: vm.admin.email,
                            to: user.email,
                            subject: "Congrats! Applicantion to be Contributor Approved",
                            body: "Congrats! Applicantion to be Contributor Approved."
                        });
                });
            ApplicationService
                .deleteApplicationById(app._id)
                .then(function(status) {
                    console.log("Application approved.");
                    console.log(status);
                });
            init();
        }

        function decline(app) {
            MessageService
                .createMessage({
                    from: vm.admin.email,
                    to: app.applicant.email,
                    subject: "Applicantion to be Contributor Declined",
                    body: "Sorry, Applicantion to be Contributor Declined."
                });
            ApplicationService
                .deleteApplicationById(app._id)
                .then(function(status) {
                    console.log("Application declined.");
                    console.log(status);
                });
            init();
        }
    }
})();