angular.module("anonSignin", [])
.controller("anonCtrl", ["$scope", function($scope){
	$scope.signIn = function () {
		$scope.authFire.$signInAnonymously().then(function(user){
			console.log("User ID: " + user.uid);
		}).catch(function(error){
			console.log("Auth failed: " + error);
		});
	};
	
		
}]);	