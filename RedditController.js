/**
 * Created by Sam on 4/11/2015.
 */
(function() {
    var mod = angular.module('RedditSearch', []);
    mod.controller('RedditController', ['$scope', '$http',
    function($scope, $http) {
        var addMessage = function(msg) {
            if (!$scope.DebugOutput) {
                $scope.DebugOutput = "";
            }
            $scope.DebugOutput = $scope.DebugOutput + msg + "<br />"
        };

        $scope.clearMessage = function() {
            $scope.DebugOutput = "";
        };

        addMessage('Test message');

        $scope.getPhotoFeed = function(txtRedditUser) {

        };

    }]);

    mod.filter("unsafe", function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
})();