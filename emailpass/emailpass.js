angular.module("empSignin", [])
.controller("empCtrl", ["$scope", "authFire", function($scope, authFire){
	
	email = "test@gmail.com";
	password = "testpass";
	/*authFire.$signInWithEmailAndPassword(email,password).then(function(user){
		console.log("success");
	}).catch(function(error){
		console.log(error);
	});*/
	
	$scope.signUp = function(){
		authFire.$createUserWithEmailAndPassword(email,password).then(function(user){
			console.log("sign up success");
		}).catch(function (error){
			console.log(error);
		})
	};
}])	