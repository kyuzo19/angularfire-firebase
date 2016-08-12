angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray, $firebaseObject){
	
	$scope.submitPost = function(){
/*add post and user's post to database*/
		$scope.postForm = $scope.recentPost = 0;
		$scope.posts.$add({
			title: $scope.title,
			body: $scope.message,
			uid: $scope.currentUserId,
			author: $scope.author
		}).then(function(ref){
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
		})
	}
}]);
	