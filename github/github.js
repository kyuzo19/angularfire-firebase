angular.module("githubSignin", [])
.controller("githubCtrl", ["$scope", "authFire", function($scope, authFire){
	$scope.githubPopup =function(){
		authFire.$signInWithPopup("github").then(function(result){
			console.log("Logged in: " + result.user.uid);
		}).catch(function(error){
			if(error.code === "auth/account-exists-with-different-credential") {
				alert("email address already exist")	
			}
			console.log(error)
			
		})
	};
	$scope.githubRedirect = function (){
		authFire.$signInWithRedirect("github").then(function(result){
			console.log("Logged in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};
}])