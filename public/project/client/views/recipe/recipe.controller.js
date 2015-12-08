"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("RecipeController", RecipeController);

    function RecipeController(RecipeService, UserService, $routeParams, $location, $rootScope)
    {
        //TODO: For now, the image is not implemented and all show the same image.
        // TODO: the unbookmark and bookmark problem
        var vm = this;
        vm.isLoggedIn = isLoggedIn;
        vm.bookmark = bookmark;
        vm.unbookmark = unbookmark;
        vm.comment = comment;
        vm.replyComment = replyComment;
        vm.findUserNameByEmail = findUserNameByEmail;
        vm.findUserIdByEmail = findUserIdByEmail;
        vm.recipe = null; // the recipe
        vm.author = null; // the recipe's author
        vm.showBookmark = true;
        vm.showUnbookmark = false;
        vm.commentSubmitted = ""; // for user comment
        vm.replytoSubmitted = null; // for user comment
        vm.user = $rootScope.user;

        function init() {
            // The bookmark buttons:
            if (isLoggedIn() && vm.user.role != 'A') {
                // See if it has already been bookmarked by the user
                var bookmarkFlag = false;
                for (var i = 0; i < vm.user.bookmarks.length; ++i) {
                    if (vm.user.bookmarks[i] == vm.recipe._id) {
                        bookmarkFlag = true;
                    }
                }
                if (bookmarkFlag) {
                    vm.showUnbookmark = true;
                    vm.showBookmark = false;
                } else {
                    vm.showBookmark = true;
                    vm.showUnbookmark = false;
                }
            } else {
                vm.showBookmark = false;
                vm.showUnbookmark = false;
            }
            RecipeService
                .findRecipeById($routeParams["id"])
                .then(function(result) {
                    if (result == null) {
                        $location.path("/");
                    } else {
                        vm.recipe = result;
                        // find author to display:
                        UserService
                            .findUserByEmail(vm.recipe.author)
                            .then(function(author) {
                                vm.author = author;
                            });
                    }
                });
        }
        init();

        function isLoggedIn() {
            return ($rootScope.user != null || $rootScope.user != undefined);
        }

        function bookmark() {
            // this function will be invoked only when this recipe is not in the user's bookmarks
            if (vm.showBookmark) {
                vm.user.bookmarks.push(vm.recipe._id);
                console.log("Before update: ");
                console.log(vm.user);
                UserService
                    .updateUser(vm.user._id, vm.user)
                    .then(function(user) {
                        console.log("User added a bookmark: ");
                        console.log(user);
                        $rootScope.user = user;
                        vm.user = user;
                        vm.showBookmark = false;
                        vm.showUnbookmark = true;
                    });
            } // else do nothing
        }

        function unbookmark() {
            if (vm.showUnbookmark) {
                for (var i = 0; i < vm.user.bookmarks.length; ++i) {
                    if (vm.user.bookmarks[i] == vm.recipe._id) {
                        vm.user.bookmarks.splice(i, 1);
                        UserService
                            .updateUser(vm.user._id, vm.user)
                            .then(function(user) {
                                console.log("User removed a bookmark: ");
                                console.log(user);
                                $rootScope.user = user;
                                vm.user = user;
                                vm.showBookmark = true;
                                vm.showUnbookmark = false;
                            });
                    }
                }
            }
        }

        function comment() {
            //TODO: also send a message to the author of recipe
            //TODO: if this is a reply, send a message to the one who is replied to
            var newComment = {"author": vm.user.email};
            if (vm.replytoSubmitted != null) {
                if (vm.commentSubmitted.indexOf("[@"+vm.replytoSubmitted+"]") > -1) {
                    newComment.replyto = vm.replytoSubmitted;
                    newComment.content = vm.commentSubmitted.replace("[@"+vm.replytoSubmitted+"]", "");
                } else {
                    newComment.content = vm.commentSubmitted;
                }
            } else {
                newComment.content = vm.commentSubmitted;
            }
            vm.recipe.comments.push(newComment);
            RecipeService
                .updateRecipe(vm.recipe._id, vm.recipe)
                .then(function(recipe) {
                    console.log("Comment pushed to recipe: ");
                    console.log(recipe);
                    vm.recipe = recipe;
                });
        }

        /**
         *
         * @param commentAuthor - email of the comment's author
         */
        function replyComment(commentAuthor) {
            vm.commentSubmitted = "[@" +commentAuthor + "]";
            vm.replytoSubmitted = commentAuthor;
        }

        /**
         *
         * @param author - email of the comment's author
         * @return author's name
         */
        function findUserNameByEmail(author) {
            UserService
                .findUserByEmail(author)
                .then(function(user) {
                    if (user != null) {
                        return user.name;
                    } else {
                        return "USER_NOT_FOUND";
                    }
                });
        }

        function findUserIdByEmail(author) {
            UserService
                .findUserByEmail(author)
                .then(function(user) {
                    if (user != null) {
                        return user._id;
                    } else {
                        return null;
                    }
                });
        }
    }
})();