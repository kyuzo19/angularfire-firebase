angular.module("twitterSignin", [])
.controller("twitterCtrl", ["$scope", "authFire", function($scope, authFire){
	$scope.twitterPopup =function(){
		authFire.$signInWithPopup("twitter").then(function(result){
			console.log("Logged in: " + result.user.uid);
		}).catch(function(error){
			console.log(error);
		})
	};
	$scope.twitterRedirect = function (){
		authFire.$singInWithRedirect("twitter").then(function(result){
			console.log("Logged in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};
}])