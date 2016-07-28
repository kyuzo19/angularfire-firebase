angular.module("anonSignin", [])
.controller("anonCtrl", ["$scope", "authFire" ,function($scope, authFire){
	$scope.signIn = function () {
		authFire.$signInAnonymously().then(function(user){
			console.log("User ID: " + user.uid);
		}).catch(function(error){
			console.log("Auth failed: " + error);
		});
	};
	
		
}]);	