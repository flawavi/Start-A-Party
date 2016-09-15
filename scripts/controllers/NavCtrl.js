"use strict"

app.controller("NavCtrl", function($scope, $location, AuthFactory){

  $scope.isLoggedIn = false;

  $scope.logout = () => {
    console.log("LOGMEOUT")
    AuthFactory.logoutUser().then(() => {
      $scope.isLoggedIn = false;
      $location.url("/login")
    });
  }

  AuthFactory.currentUser().then(() => {
    $scope.isLoggedIn = true;
  });

  $scope.navItems = [
      {
        name: "Logout",
        url: "#/logout"
      },
      {
        name: "Start A Party",
        url: "#/party-form"
      },

      {
        name: "Your Profile",
        url: "#/userprofile"
      }
  ]



  $scope.isActive = (viewLocation) => viewLocation === $location.path();

});