"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService)
    {
        $scope.$location = $location;
        //console.log($location.url());

        $scope.register = function() {
            console.log("NG-CLICK REGISTER()");
            var user = UserService.createUser({"username": $scope.username,
                                               "password": $scope.password,
                                               "email": $scope.email},
                                              function(user) {
                                                  console.log("User created. User Id: " + user.id);
                                              });
            $rootScope.user = user;
            $location.path('/profile');
        }
    }
})();


/**
 * The following is the CourseController by instructor for reference.
(function(){
    angular
        .module("WhiteBoardApp")
        .controller("CourseController", CourseController);

    function CourseController($scope, CourseService) {

        $scope.courses = CourseService.getAllCourses();

        $scope.removeCourse = function(index) {
            console.log(index);
            $scope.courses.splice(index, 1);
        }
    }
})();
 **/