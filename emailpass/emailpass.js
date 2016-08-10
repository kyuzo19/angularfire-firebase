angular.module("empSignin", [])
.controller("empCtrl", ["$scope", function($scope){
	
	$scope.signIn = function(){
		email = $scope.email;
		password = $scope.password;
		$scope.authFire.$signInWithEmailAndPassword(email,password).then(function(user){
		console.log("success");
	}).catch(function(error){
		console.log(error);
	});
		
	};
	
	$scope.signUp = function(){
		email = $scope.email;
		password = $scope.password;
		$scope.authFire.$createUserWithEmailAndPassword(email,password).then(function(user){
			console.log("sign up success");
		}).catch(function (error){
			console.log(error);
		})
	};
	
	$scope.verifyEmail = function (){
		firebase.auth().currentUser.sendEmailVerification().then(function(user){
			console.log("Verification send")
		})
	}
}])	