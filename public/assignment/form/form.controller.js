"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService)
    {
        $scope.$location = $location;
        $scope.forms = null;
        updateScopeForms($rootScope.user.id);
        $scope.selectedFormIndex = null;

        /** addForm():
         * Uses form model and FormService to create a new form
         * Updates the $scope.forms with the new array of forms
         */
        $scope.addForm = function() {
            if (form_name_check($scope.inputFormName)) {
                var form = {"name" : $scope.inputFormName};
                FormService.createFormForUser($rootScope.user.id, form, add_form_callback);
                updateScopeForms($rootScope.user.id);
                // Empty the input field:
                $scope.inputFormName = "";
                $scope.selectedFormIndex = null;
            }
            else {
                alert("The name of a form cannot be empty!");
            }
        }

        /**
         * @param form: the form created
         */
        function add_form_callback(form) {
            console.log("New form created, ID: " + form.id);
        }


        /** updateForm()
         * Uses form model and FormService to update the currently selected form
         */
        $scope.updateForm = function() {
            if (form_name_check($scope.inputFormName))
            {
                var form = $scope.forms[$scope.selectedFormIndex];
                form.name = $scope.inputFormName;
                FormService.updateFormById(form.id, form, function(form) {
                    console.log("New form details:");
                    console.log("ID: " + form.id + "\nName: " + form.name);
                });
                updateScopeForms($rootScope.user.id);
                // Empty the input field:
                $scope.inputFormName = "";
            }
            else {
                alert("The name of a form cannot be empty!");
            }
        }

        /** deleteForm(index):
         * Uses the FormService to remove the form by index
         * @param index - the index of the form that should be deleted.
         * **/
        $scope.deleteForm = function(index) {
            var formid = $scope.forms[index].id;
            FormService.deleteFormById(formid, function(form) {
                                                   console.log("Selected form deleted.");
                                               });
            updateScopeForms($rootScope.user.id);
            $scope.selectedFormIndex = null;
        }

        /** selectForm(index):
         * Uses the index to mark the currently selected form
         * Updates the form with the currently selected form
         * @param index - the index of the form that is selected by the user.
         */
        $scope.selectForm = function(index) {
            $scope.selectedFormIndex = index;
            // updates the first row (input fields) to show the selected item details.
            $scope.inputFormName = $scope.forms[index].name;
        }

        /**
         * Effect: updates $scope.forms
         * @param userid
         */
        function updateScopeForms(userid) {
            FormService.findAllFormsForUser(userid, function (form_array) {
                $scope.forms = form_array;
            });
        }

        function form_name_check(name) {
            if (name == "" || name == null) {
                return false;
            }
            else {
                return true;
            }
        }
    }
})();
