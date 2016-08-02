angular.module("database", [])
.controller("dataCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
	var useruid = firebase.auth().currentUser.uid;
	var ref = firebase.database().ref("users/" + useruid);
	var list = $firebaseArray(ref);
	
	$scope.submitPost = function(){
		var email = firebase.auth().currentUser.email;
		list.$add({
			email: email
		}).then(function(data){
			console.log(data.key)
		})
	}
}]);
	