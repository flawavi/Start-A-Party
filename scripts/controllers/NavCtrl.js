"use strict"

app.controller("NavCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ProfileFactory
  ){

  $scope.isLoggedIn = false
  AuthFactory.currentUser().then(user => {
    ProfileFactory.getProfileById(user.uid)
    .then(profile => {
      $scope.isLoggedIn = true
      $scope.userName = "Welcome to the party, " + profile.userName
    })
  })

  $scope.logout = () => {
    AuthFactory.logoutUser().then(data => {
      $scope.isLoggedIn = false;
      if(data) {
        $window.location.href = "#/"
      } else {
        $window.location.href = "#/login"
      }
      $location.url("/login")
    })
  }


  $scope.isActive = viewLocation => viewLocation === $location.path();



});