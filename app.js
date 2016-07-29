angular.module("fireApp",["ngRoute", "anonSignin", "empSignin", "googleSignin", "firebase"])
.factory("authFire", ["$firebaseAuth", function ($firebaseAuth) {
			return $firebaseAuth();		  
}])
.config(function(){
	// Initialize Firebase
  	var config = {
  	  apiKey: "AIzaSyBlRofSMBBkARysnN0LUfBWg9CBofsvjdw",
  	  authDomain: "angularfire-aa076.firebaseapp.com",
  	  databaseURL: "https://angularfire-aa076.firebaseio.com",
  	  storageBucket: "angularfire-aa076.appspot.com",
  	};
  	firebase.initializeApp(config);
})
.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/anonym", {
			templateUrl: "/anonymous/anon.html",
			controller: "anonCtrl"
		})
		.when("/email", {
			templateUrl: "/emailpass/emailpass.html",
			controller: "empCtrl"
		})
		.when("/popup", {
			templateUrl: "/google/google.html",
			controller: "googleCtrl"
		})
}])
.controller("fireCtrl", ["$scope", "authFire", function($scope, authFire){
	$scope.authFire = authFire;
	authFire.$onAuthStateChanged(function(user){
			if(user){
				console.log("onauthchanged user id: " + user.uid);
			} else {
				console.log("Signed Out")
			}
		$scope.user = user;
		});
	

	
}] )