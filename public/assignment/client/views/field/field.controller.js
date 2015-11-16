"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    /**
     * @param $rootScope: contains the current user object
     * @param $location
     * @param FormService
     * @constructor
     */
    function FieldController($rootScope, $location, FieldService, $routeParams)
    {
        var model = this;
        model.$location = $location;
        model.fields = null;
        model.types = [
            {id: 0, value:"TEXT", label: "Single Line Text Field", name: "New Text Field"}, //0
            {id: 1, value:"TEXTAREA", label: "Multi Line Text Field", name: "New Text Field"},  //1
            {id: 2, value:"DATE", label: "Date Field", name: "New Date Field"},             //2
            {id: 3, value:"OPTIONS", label: "Dropdown Field", name:"New Dropdown"},         //3
            {id: 4, value:"CHECKBOXES", label: "Checkboxes Field", name:"New Checkboxes"},       //4
            {id: 5, value:"RADIOS", label: "Radio Buttons Field", name:"New Radio Buttons"}     //5
        ];
        model.selectedNewField = model.types[0];
        model.addField = addField;
        model.removeField= removeField;
        model.fieldType = fieldType;
        model.userId = $routeParams["userId"];
        model.formId = $routeParams["formId"];
        console.log("user id: " + model.userId);
        console.log("form id: " + model.formId);

        function init() {
            FieldService
                .getFieldsForForm(model.formId)
                .then(function(fields) {
                    model.fields = fields;
                });
        }
        init();

        function addField(type) {
            var newField = {
                id: null,
                label: type.name,
                type: type.value
            };
            if (type.id == 0 || type.id == 1) {
                newField.placeholder = "New Field";
            }
            else if (type.id == 3) {
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            }
            else if (type.id == 4) {
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            }
            else if (type.id == 5) {
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }

            // post:
            FieldService
                .createFieldForForm(model.formId, newField)
                .then(function (form) {
                    model.fields = form.fields;
                });
        }

        function fieldType(type) {
            if (type == "TEXT") {
                return 0;
            }
            else if (type == "TEXTAREA") {
                return 1;
            }
            else if (type == "DATE") {
                return 2;
            }
            else if (type == "OPTIONS") {
                return 3;
            }
            else if (type == "CHECKBOXES") {
                return 4;
            }
            else if (type == "RADIOS") {
                return 5;
            }
            else{
                return 0;
            }

        }

        function removeField(field) {
            console.log("REMOVE FIELD ID: "+ field.id);
            FieldService
                .deleteFieldFromForm(model.formId, field.id)
                .then(function(form) {
                    model.fields = form.fields;
                });
        }
    }
})();
