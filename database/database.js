angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "dataFire", function($scope, $firebaseArray, $firebaseObject, dataFire){
	
	$scope.submitPost = function(){
/*add post and user's post to database*/
		$scope.postForm = $scope.recentPost = 0;
		var post = $firebaseArray(dataFire.postRef);
		$scope.post;
		post.$add({
			title: $scope.title,
			body: $scope.message,
			uid: $scope.userid,
			author: $scope.author
		}).then(function(ref){
/*add user's post to database*/
			console.log("added post successfull" );
			var postUser = $firebaseObject(dataFire.userPostRef($scope.userid, ref.key));
			postUser.title = $scope.title;
			postUser.message = $scope.message;
			postUser.$save().then(function(ref){
				console.log("added post to user success")
				$scope.title = "";
				$scope.message = "";
				$scope.showForm = 1;
			}).catch(function(err){
				console.log(err)
			});
/*add user's post to database*/		
		});
/*add post and user's post to database*/
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
		delete $scope.userposts[key];
			$scope.userposts.$save();
		
	}
}]);
	