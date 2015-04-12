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

        var processResponse = function(response) {
            addMessage('Resposne = ' + JSON.stringify(response.data));
        }

        $scope.clearMessage = function() {
            $scope.DebugOutput = "";
        };

        addMessage('Test message');

        $scope.getPhotoFeed = function(txtRedditUser) {
            addMessage("getting media feed for user " + txtRedditUser);
            var requestUrl = 'https://www.reddit.com/user/' + txtRedditUser + '/submitted.json';
            $http.get(requestUrl).then(processResponse);
        };

    }]);

    mod.filter("unsafe", function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
})();