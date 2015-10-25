"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService)
    {
        $scope.$location = $location;
        $scope.forms = updateScopeForms($rootScope.user.id);
        $scope.selectedFormIndex = null;

        /** addForm():
         * Uses form model and FormService to create a new form
         * Updates the $scope.forms with the new array of forms
         */
        $scope.addForm = function() {
            var form = {"name" : $scope.inputFormName};
            FormService.createFormForUser($rootScope.user.id, form,
                                          function(form) {
                                              console.log("Form id: " + form.id + " created.");
                                          });
            $scope.forms = updateScopeForms($rootScope.user.id);
            // Empty the input field:
            $scope.inputFormName = "";
        }

        /** updateForm()
         * Uses form model and FormService to update the currently selected form
         */
        $scope.updateForm = function() {
            var form = $scope.forms[$scope.selectedFormIndex];
            form.name = $scope.inputFormName;
            FormService.updateFormById(form.id, form, function(form) {
                                                          console.log("New form details:");
                                                          console.log("ID: " + form.id + "\nName: " + form.name);
                                                      });
            $scope.forms =updateScopeForms($rootScope.user.id);
            // Empty the input field:
            $scope.inputFormName = "";
        }

        /** deleteForm(index):
         * Uses the FormService to remove the form by index
         * @param index - the index of the form that should be deleted.
         * **/
        $scope.deleteForm = function(index) {
            var formid = $scope.forms[index].id;
            FormService.deleteFormById(formid, function(forms) {
                                                   console.log("Selected form deleted.");
                                               });
            $scope.forms =updateScopeForms($rootScope.user.id);
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

        function updateScopeForms(userid) {
            return FormService.findAllFormsForUser(userid, function(forms) {
                for (var i=0; i < forms.length; ++i) {
                    console.log("Form "+forms[i].id+" fetched.");
                }
            })
        }
    }
})();
