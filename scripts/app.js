//app.js is our entry file, our jumping off point
"use strict";

//******************************************************************//
// ngRoute is the name of the module inside the angular.min.js file
// the same way that "TodoApp" is the name of the module in the app.js
//******************************************************************//
var app = angular.module("StartAParty", ["ngRoute"])
    // .constant("FirebaseURL", "https://todoapp-5a055.firebaseio.com/");//definig a variable called Firebase with a value of a specific URL

// let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
// //isAuthenticated returns a boolean
//   if (AuthFactory.isAuthenticated()) {
//     resolve();
//   } else {
//     reject();
//   }
// });

app.config(function($routeProvider){
    $routeProvider
        //when arrived at site for first time, go to login
        .when("/", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })
        //when login link clicked, also send to login
        .when("/login", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })
        //templateUrl - the U is big, the rl are not!
        .when("/profile", {
            templateUrl: "partials/profile.html",
            controller: "ProfileCtrl",
            // resolve: {isAuth}
        })
        .when("/startaparty", {
            templateUrl: "partials/big-button.html",
            controller: "StartAPartyCtrl",
            // resolve: {isAuth}
        })
        //itemId is a placeholder for any ID. after item/: -
        //anything after colon will be saved in a variable called itemId
        // .when("/items/view/:itemId", {
        //     templateUrl: "partials/item-details.html",
        //     controller: "ItemViewCtrl",
        //     // resolve: {isAuth}
        // })
        // .when("/items/view/:itemId/edit", {
        //   templateUrl: "partials/item-form.html",
        //   controller: "ItemEditCtrl",
        //   // resolve: {isAuth}
        // })
        // .when("/items/edit/:itemId", {
        //     templateUrl: "partials/item-form-edit.html",
        //     controller: "ItemEditCtrl",
        //     resolve: {isAuth}
        // })
        //if user tries to reroute to somewhere else,
        //it sends them back home/login
        .otherwise("/");

});

// app.run(($location, FBCreds) => {
//   let creds = FBCreds;
//   let authConfig = {
//         apiKey: creds.key,
//         authDomain: creds.authDomain
//       };
//       firebase.initializeApp(authConfig);
// });

