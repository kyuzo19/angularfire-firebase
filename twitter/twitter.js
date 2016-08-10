angular.module("twitterSignin", [])
.controller("twitterCtrl", ["$scope", function($scope){
	$scope.twitterPopup =function(){
		$scope.authFire.$signInWithPopup("twitter").then(function(result){
			console.log("Logged in: " + result.user.uid);
		}).catch(function(error){
			console.log(error);
		})
	};
	$scope.twitterRedirect = function (){
		$scope.authFire.$singInWithRedirect("twitter").then(function(result){
			console.log("Logged in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};
}])