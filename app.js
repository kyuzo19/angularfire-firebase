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
			var displayName = user.displayName;
			var email = user.email
			var emailVerified = user.emailVerified;
			var isAnonymous = user.isAnonymous;
			var photoUrl = user.photoUrl;
			var providerData = user.providerData;
			var providerId = user.providerId;
			var uid = user.uid;
			/*author*/
			$scope.author =  user.providerData[0].displayName;
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
/*end authenticated user's details*/
            var currentUserId = firebase.auth().currentUser.uid;
            $scope.currentUserId = currentUserId;
            var postRef = firebase.database().ref("posts");
            var userIdRef = firebase.database().ref("users/" + currentUserId);
            var posts = $firebaseArray(postRef);
			var userDetails = $firebaseObject(userIdRef);
			posts.$loaded().then(function(arr){
				if (arr.length < 5){
					$scope.posts5 = arr;
				} else {
					$scope.posts5 = arr.slice((arr.length - 5), arr.length);
				};
				$scope.totalPosts = arr.length;
				console.log(arr.length);
			}).catch(function(err){
				console.log(err);
			});
			
			$scope.posts = posts;
			
			
			$scope.userDetails = userDetails;
 /*add current user's displayname and email to db*/
			if(!displayName){
				displayName = "No displayname or username";	
			};
			userDetails.username = displayName;
			userDetails.email = email;
			userDetails.$save().then(function(ref){
				console.log("user id added to database: " + ref.key);
			}, function(err){
			console.log(err)})
 /* end add user's displayname and email to db*/
					
/*read user's posts reference iteration*/
			var userposts = $firebaseObject(firebase.database().ref("user-posts/" + firebase.auth().currentUser.uid));
			userposts.$loaded().then(function(userposts){
				console.log("loaded record: " + userposts.$id, userposts.title);
				});			
/*Iteration through userposts Object $firebaseObject*/
			angular.forEach(userposts, function(value, key) {
          		console.log("key:" + key);
				console.log("value title:" + value.title);
				console.log("value message:" + value.message);
			});			
/*End of Iteration*/
			$scope.userposts = userposts;
/*end user's posts iteration*/
			
			
			
		
		} else {
			console.log("Signed Out");
			$scope.jason = null;
		};
/*end add current user's username and email to database*/
		
		
		});
/*end listen to client's auth state*/
	

	
}] )