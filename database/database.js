angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", "$firebaseObject", "dataFire", function($scope, $firebaseArray, $firebaseObject, dataFire){
	
	$scope.submitPost = function(){
/*add post and user's post to database*/
		$scope.postForm = 0;
		$scope.recentPosts = 0;
		var post = $firebaseArray(dataFire.postRef);
		post.$add({
			title: $scope.title,
			body: $scope.message
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
		$scope.postForm = 0;
		$scope.recentPost = 0;
		$scope.myPosts = 0;
	};
	
	$scope.myPost = function(){
		$scope.myPosts = 1;
		$scope.postForm = 0;
		$scope.recentPost = 1;
	};
	
	$scope.addPost = function(){
		$scope.postForm = 1;
		$scope.recentPost = 1;
		$scope.myPosts = 0; 
	}
}]);
	