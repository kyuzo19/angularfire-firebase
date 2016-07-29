angular.module("googleSignin",[])
.controller("googleCtrl", ["$scope", "authFire", function($scope,authFire){
	$scope.googlePopUp = function(){
		//optional 
		/*var provider = new firebase.auth.GoogleAuthProvider();*/
		authFire.$signInWithPopup("google").then(function(result){
			console.log("Sign in as: " + result.user.uid)
		}).catch(function(error){
			console.log(error);
		})
	};	
	$scope.googleRedirect = function(){
		authFire.$signInWithRedirect("google").catch(function(error){
			console.log(error);
		})
	};
}])	