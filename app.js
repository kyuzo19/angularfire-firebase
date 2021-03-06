angular.module("fireApp",["ngRoute", "anonSignin", "empSignin", "googleSignin", "facebookSignin", "twitterSignin", "githubSignin", "database", "firebase", "storage"])
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
.directive("listPost", function () {
    return {
        restrict: "AE",
        templateUrl: "database/posts.html",
        scope: {
			post: "="
		}
    };
    
})
.directive("submitForm", function () {
	return {
		restrict: "AE",
		templateUrl: "database/submitform.html",
		scope: false
	};
})
.directive("userPost", function () {
	return {
		restrict: "AE",
		templateUrl: "database/userposts.html",
		scope: false
	};
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
		.when("/storage", {
			templateUrl: "/storage/storage.html",
			controller: "strCtrl"
		})
}])
.controller("fireCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$firebaseAuth", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth){
	$scope.authFire = $firebaseAuth();
/*listen to client's auth state*/
	$firebaseAuth().$onAuthStateChanged(function(user){
		$scope.user = user;
	/*if user is authenticated*/
		if(user){
			/*authenticated user's details*/
			var data = {};
			data.displayName = user.displayName;
			data.email = user.email
			data.emailVerified = user.emailVerified;
			data.isAnonymous = user.isAnonymous;
			data.photoUrl = user.photoUrl;
			data.providerData = user.providerData;
			data.providerId = user.providerId;
			data.uid = user.uid;
			/*author*/
			$scope.author =  user.providerData[0].displayName;
			$scope.jason = JSON.stringify(data);
			/*end authenticated user's details*/
            var currentUserId = firebase.auth().currentUser.uid;
            $scope.currentUserId = currentUserId;
            var postRef = firebase.database().ref("posts");
            var userIdRef = firebase.database().ref("users/" + currentUserId);
            var posts = $firebaseArray(postRef);
			var userDetails = $firebaseObject(userIdRef);
			$scope.posts = posts;
 /*add current user's displayname and email to db*/
			if(!data.displayName){
				data.displayName = "No displayname or username";	
			};
			userDetails.username = data.displayName;
			userDetails.email = data.email;
			userDetails.$save().then(function(ref){
				console.log("user id added to database: " + ref.key);
			}, function(err){
			console.log(err)})
 /* end add user's displayname and email to db*/
					
/*read user's posts reference iteration*/
			var userposts = $firebaseObject(firebase.database().ref("user-posts/" + firebase.auth().currentUser.uid));
			$scope.userposts = userposts;

		} else {
			console.log("Signed Out");
			$scope.jason = null;
		};
/*end add current user's username and email to database*/
		
		
		});
/*end listen to client's auth state*/
	

	
}] )