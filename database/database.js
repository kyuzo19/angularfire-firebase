angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray, $firebaseObject){
	
	$scope.submitPost = function(){
/*add post and user's post to database*/
		var postRef = firebase.database().ref("posts");
		var post = $firebaseArray(postRef);
		post.$add({
			title: $scope.title,
			body: $scope.message
		}).then(function(ref){
/*add user's post to database*/
			console.log("added post successfull" );
			var postRefuser = firebase.database().ref("user-posts/" + firebase.auth().currentUser.uid + "/" + ref.key);
			var postUser = $firebaseObject(postRefuser);
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
}]);
	