"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    /**
     * @param $rootScope: contains the current user object
     * @param $location
     * @param FormService
     * @constructor
     */
    function FormController($rootScope, $location, FormService)
    {
        var model = this;
        model.$location = $location;
        model.forms = null;
        model.selectedFormIndex = null;

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        function init() {
            FormService
                .findAllFormsForUser($rootScope.user.id)
                .then(function(forms) {
                    model.forms = forms;
                });
        }
        init();

        /** addForm():
         * Uses form model and FormService to create a new form
         */
        function addForm() {
            if (form_name_check(model.inputFormName)) {
                var form = {"name" : model.inputFormName};
                FormService
                    .createFormForUser($rootScope.user.id, form)
                    .then(function(form) {
                        model.forms.push(form); // update the forms to show
                    });
                // Empty the input field:
                model.inputFormName = "";
                model.selectedFormIndex = null;
            }
            else {
                alert("The name of a form cannot be empty!");
            }
        }


        /** updateForm()
         * Uses form model and FormService to update the currently selected form
         */
        function updateForm() {
            if (form_name_check(model.inputFormName))
            {
                var form = model.forms[model.selectedFormIndex];
                form.name = model.inputFormName;
                FormService
                    .updateFormById(form.id, form)
                    .then(function(form) {
                        model.forms[model.selectedFormIndex] = form;
                    });
                // Empty the input field:
                model.inputFormName = "";
            }
            else {
                alert("The name of a form cannot be empty!");
            }
        }

        /** deleteForm(index):
         * Uses the FormService to remove the form by index
         * @param index - the index of the form that should be deleted.
         * **/
        function deleteForm(index) {
            var formid = model.forms[index].id;
            FormService
                .deleteFormById(formid)
                .then(function() {
                    model.forms.splice(index, 1); // remove the deleted form
                });
            model.selectedFormIndex = null;
            // model.inputFormName = "";
        }

        /** selectForm(index):
         * Uses the index to mark the currently selected form
         * Updates the form with the currently selected form
         * @param index - the index of the form that is selected by the user.
         */
        function selectForm(index) {
            model.selectedFormIndex = index;
            // updates the first row (input fields) to show the selected item details.
            model.inputFormName = model.forms[index].title;
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
