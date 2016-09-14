"use strict"

app.controller("NavCtrl", function($scope, $location){

  $scope.navItems = [
      {
        name: "Logout",
        url: "#/logout",
        showState: "$parent.isLoggedIn"
      },

      {
        name: "Login",
        url: "#/login",
        showState: "!$parent.isLoggedOut"
      },

      {
        name: "Start A Party",
        url: "#/party-form",
        showState: "$parent.isLoggedIn"
      },

      {
        name: "Your Profile",
        url: "#/userprofile",
        showState: "$parent.isLoggedIn"
      }
  ]

  $scope.isActive = (viewLocation) => viewLocation === $location.path();

});