angular.module("facebookSignin", [])
.controller("facebookCtrl", ["$scope", function($scope){
	$scope.facebookPopup = function(){
		
		$scope.authFire.$signInWithPopup("facebook").then(function(result){
			console.log("Logged in as: " + result.user.uid);
		}).catch(function(error){
				console.log(error);
		 })
		
	};
	
	$scope.facebookRedirect = function(){
		
		$scope.authFire.$signInWithRedirect("facebook").then(function(result){
			console.log("Logged in: " + result.user.uid) 
		}).catch(function(error){
			console.log(error);
		})
		
	};
}])