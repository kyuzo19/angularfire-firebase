angular.module("facebookSignin", [])
.controller("facebookCtrl", ["$scope", "authFire", function($scope, authFire){
	$scope.facebookPopup = function(){
		
		authFire.$signInWithPopup("facebook").then(function(result){
			console.log("Logged in as: " + result.user.uid);
		}).catch(function(error){
				console.log(error);
		 })
		
	};
	
	$scope.facebookRedirect = function(){
		
		authFire.$signInWithRedirect("facebook").then(function(result){
			console.log("Logged in: " + result.user.uid) 
		}).catch(function(error){
			console.log(error);
		})
		
	};
}])