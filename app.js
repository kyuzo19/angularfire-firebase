angular.module("fireApp",["ngRoute", "anonSignin", "empSignin", "googleSignin", "facebookSignin", "twitterSignin", "githubSignin", "database", "firebase"])
.factory("authFire", ["$firebaseAuth", function ($firebaseAuth) {
			return $firebaseAuth();		  
}])
/*.factory("dataFire", ["$firebaseArray", "authFire", function($firebaseArray, authFire){
	var ref = firebase.database().ref("users/" + firebase.auth().currentUser.uid);
	return $firebaseArray(ref);
}])*/
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
		.when("/google", {
			templateUrl: "/google/google.html",
			controller: "googleCtrl"
		})
		.when("/facebook", {
			templateUrl: "/facebook/facebook.html",
			controller: "facebookCtrl"
		})
		.when("/twitter", {
			templateUrl: "/twitter/twitter.html",
			controller: "twitterCtrl"
		})
		.when("/github", {
			templateUrl: "/github/github.html",
			controller: "githubCtrl"
		})	
		.when("/database", {
			templateUrl: "/database/database.html",
			controller: "dataCtrl"
		})
}])
.controller("fireCtrl", ["$scope", "authFire", "$firebaseObject", "$firebaseArray", function($scope, authFire, $firebaseObject, $firebaseArray){
	$scope.authFire = authFire;
	var postRef = firebase.database().ref("posts");
	var post = $firebaseArray(postRef);
	$scope.posts = post;
	authFire.$onAuthStateChanged(function(user){
		if(user){
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var isAnonymous = user.isAnonymous;
			var photoUrl = user.photoUrl;
			var providerData = user.providerData;
			var providerId = user.providerId;
			var uid = user.uid;
			console.log("onauthchanged user id: " + user.uid);
			$scope.jason = JSON.stringify({
				userdisplayname: displayName,
				useremail: email,
				useremailverified: emailVerified,
				useranonymous: isAnonymous,
				userphotourl: photoUrl,
				userproviderdata: providerData,
				userproviderid: providerId,
				userid: uid
			});
			if(!displayName){
				displayName = "No displayname or username";	
			};
/*starts add current user's username and email to database*/
 			var ref = firebase.database().ref("users/" + firebase.auth().currentUser.uid);
			var user = $firebaseObject(ref);
			user.username = displayName;
			user.email = email;
			user.$save().then(function(ref){
				console.log("user id added to database: " + ref.key);
			}, function(err){
			console.log(err)})
			
		} else {
			console.log("Signed Out");
			$scope.jason = null;
		};
/*end add current user's username and email to database*/
		$scope.user = user;
		
		});
	

	
}] )