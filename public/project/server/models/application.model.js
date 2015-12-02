"use strict";
module.exports = function(app, mongoose, ApplicationSchema) {
    var q = require("q");
    var ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);
    var api = {
        createApplication : createApplication, // arg: application
        findAllApplication : findAllApplication, // arg: null
        findApplicationById : findApplicationById, // arg: _id
        findApplicationByApplicant : findApplicationByApplicant, // arg: email of applicant
        updateApplication : updateApplication, // arg: _id, newApplicaiton
        deleteApplicationById : deleteApplicationById, // arg: _id
    };
    return api;


    /**
     *
     * @param msg
     * @returns {*|promise}
     */
    function createApplication(application) {
        var deferred = q.defer();
        ApplicationModel.create(application, function(err, result) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result); // should return the created user
            }
        });
        return deferred.promise;
    }

    function findAllApplication() {
        var deferred = q.defer();

        ApplicationModel.find(function(err, applications){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(applications);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @returns {*|promise}
     */
    function findApplicationById(id) {
        var deferred = q.defer();

        ApplicationModel.findById(id, function(err, application){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(application);
            }
        });

        return deferred.promise;
    }

    /**
     * Find an application by an applicant's email
     * @param email
     * @returns {*|promise}
     */
    function findApplicationByApplicant(email) {
        var deferred = q.defer();
        ApplicationModel.findOne({"applicant": email}, function(err, application) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(application);
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @param application - the whole application object to be modified
     * @returns {*|promise}
     */
    function updateApplication(id, application) {
        var deferred = q.defer();

        delete application["_id"];

        ApplicationModel.findOneAndUpdate({"_id": id}, {$set: application},{ 'new': true }, function(err, newApp) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newApp);
            }
        });

        return deferred.promise;
    }

    /**
     *
     * @param id - _id
     * @returns {*|promise}
     */
    function deleteApplicationById(id) {
        var deferred = q.defer();

        ApplicationModel.remove({"_id": id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
};