angular.module("githubSignin", [])
.controller("githubCtrl", ["$scope", function($scope){
	$scope.githubPopup =function(){
		$scope.authFire.$signInWithPopup("github").then(function(result){
			console.log("Logged in: " + result.user.uid);
		}).catch(function(error){
			if(error.code === "auth/account-exists-with-different-credential") {
				alert("email address already exist")	
			}
			console.log(error)
			
		})
	};
	$scope.githubRedirect = function (){
		$scope.authFire.$signInWithRedirect("github").then(function(result){
			console.log("Logged in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};
}])