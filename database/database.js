angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray, $firebaseObject){
	$scope.postsPager = {};
	var postsPager = $scope.postsPager;
	postsPager.currentPage = [];
	postsPager.offset = 0;
	postsPager.pageSize = 5;
	$scope.submitPost = function(){
		/*add post and user's post to database*/
		$scope.postForm = $scope.recentPost = 0;
		$scope.posts.$add({
			title: $scope.title,
			body: $scope.message,
			uid: $scope.currentUserId,
			author: $scope.author
		}).then(function(ref){
            pageResult();
			/*add or write user's post to database*/
			var userPostsRef = firebase.database().ref("user-posts/" + $scope.currentUserId + "/" + ref.key)
			var userPosts = $firebaseObject(userPostsRef);
			$scope.userPosts = userPosts;
			userPosts.title = $scope.title;
			userPosts.message = $scope.message;
			userPosts.$save().then(function(ref){
				console.log("added post to user success")
				$scope.title = "";
				$scope.message = "";
				$scope.showForm = 1;
			}).catch(function(err){
				console.log(err)
			});
			/*end add user's post to database*/		
		});
		/*end add post and user's post to database*/
	};
	
	$scope.recentPosts = function(){
		pageResult();
		$scope.postForm = $scope.recentPost = $scope.myPosts = 0;
	};
	
	$scope.myPost = function(){
		$scope.myPosts = $scope.recentPost = 1;
		$scope.postForm = 0;
	};
	
	$scope.addPost = function(){
		$scope.postForm = $scope.recentPost = 1;
		$scope.myPosts = 0; 
	}
	
	$scope.deletePost = function(key){        
/*delete from user's post*/
		delete $scope.userposts[key];
		$scope.userposts.$save();
/*delete from posts*/
		var ind = $scope.posts.$indexFor(key);
		$scope.posts.$remove(ind).then(function(ref){
			console.log("remove successful")
		});
		$scope.posts.$loaded().then(function(arr){
				$scope.posts.length = arr.length;
				console.log("at loadeded "+arr.length);
				pageResult();
			}).catch(function(err){
				console.log(err);
			});
		
		postsPager.offset = 0;
	};
	
	/*for pager set up*/
	 function pageResult() {
		 console.log("length: " + $scope.posts.length);
		postsPager.currentPage = $scope.posts.slice(postsPager.offset, postsPager.pageSize + postsPager.offset);
         postsPager.next = 1;
		 postsPager.prev = 1;
         if (postsPager.offset <= 0){
             postsPager.prev = 0;
         }; 
		 if ($scope.posts.length <= postsPager.offset + 5) {
             postsPager.next = 0;
         };
         console.log("length: " + $scope.posts.length);
         console.log("offset: " + postsPager.offset);
	};

	$scope.postsPager.nextPage = function (){
        
		postsPager.offset += postsPager.pageSize;
		pageResult();
	};
	
	$scope.postsPager.prevPage = function (){
        
	   postsPager.offset -= postsPager.pageSize;
		pageResult();
	};
	
	
	
	
}]);
	