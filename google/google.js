angular.module("googleSignin",[])
.controller("googleCtrl", ["$scope", function($scope){
	$scope.googlePopUp = function(){
		//optional 
		/*var provider = new firebase.auth.GoogleAuthProvider();*/
		$scope.authFire.$signInWithPopup("google").then(function(result){
			console.log("Sign in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};	
	$scope.googleRedirect = function(){
		$scope.authFire.$signInWithRedirect("google").catch(function(error){
			console.log(error);
		})
	};
}])	