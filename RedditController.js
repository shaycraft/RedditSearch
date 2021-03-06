/**
 * Created by Sam on 4/11/2015.
 */
(function() {
    var RedditEntry = function(title, subreddit_name, permalink, url, thumb_url)
    {
        this.title = title;
        this.subreddit_name = subreddit_name;
        this.permalink = permalink;
        this.url = url;
        this.thumb_url = thumb_url;
    };

    var showDebug = false;
    var mod = angular.module('RedditSearch', ['ngResource']);
    mod.controller('RedditController', ['$scope', '$resource',
    function($scope, $resource) {
        var addMessage = function(msg) {
            if (!$scope.DebugOutput) {
                $scope.DebugOutput = "";
            }
            $scope.DebugOutput = $scope.DebugOutput + msg + "<hr />"
        };

        // initialize scope variables
        $scope.subreddit_list = null;
        $scope.last_name = null;

        var processResponse = function(response) {
            var data = response.data.children;
            if (showDebug) {
               data.forEach(function(item) {
                   addMessage(JSON.stringify(item));
                   console.log(item);
               });
            }

            var subreddit_list = [];
            data.forEach(function(item) {
               if (item.kind == 't3') {
                   var item_data = item.data;
                   var subreddit = item_data.subreddit;
                   var thumbnail_url = item_data.url;
                   if (thumbnail_url == 'nsfw' || thumbnail_url.indexOf('.jpg') < 0 && item_data.media) {
                       thumbnail_url = item_data.media.oembed.thumbnail_url;
                   }
                   subreddit_list.push(new RedditEntry(item_data.title, subreddit, item_data.permalink, item_data.url, thumbnail_url));
                   $scope.last_name = item_data.name;
               }
            });
            if (showDebug) {
                console.log(subreddit_list);
                addMessage("Last_name = " + $scope.last_name);
            }
            $scope.subreddit_list = subreddit_list;

        };

        $scope.clearMessage = function() {
            $scope.DebugOutput = "";
        };


        $scope.getPhotoFeed = function(txtRedditUser) {
            $scope.subreddit_list = [];

            showDebug = $scope.chkDebug;
            addMessage("getting media feed for user " + txtRedditUser);
            var requestUrl = "";
            if ($scope.last_name) {
                requestUrl = 'https://www.reddit.com/user/' + txtRedditUser + '/submitted.json?count=25&after=' + $scope.last_name;
            }
            else {
                requestUrl = 'https://www.reddit.com/user/' + txtRedditUser + '/submitted.json';
            }
            if (showDebug) {
                addMessage('Initiating call to ' + requestUrl);
            }
            var redditFeed = $resource(requestUrl);
            redditFeed.get(processResponse);
        };

    }]);

    mod.filter("unsafe", function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
})();