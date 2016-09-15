"use strict"

app.controller("NavCtrl", function($scope, $location, AuthFactory, $window){

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

  $scope.logout = () => {
    console.log("you logged out")
    AuthFactory.logoutUser()
    .then(data => {
      if(data) {
        $window.location.href = "#/profile"
      } else {
        $window.location.href = "#/login"
      }
      console.log("data", data)
    })
  }

  $scope.isActive = viewLocation => viewLocation === $location.path();

});