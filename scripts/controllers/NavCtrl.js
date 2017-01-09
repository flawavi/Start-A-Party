"use strict"

app.controller("NavCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ProfileFactory
  ){

  $scope.isLoggedIn = false
  $scope.notLoggedIn = true
  AuthFactory.currentUser().then(user => {
    if(user === null){
      $scope.pleaseCreateAccount = "Please create an account to start partying."
      return $scope.pleaseCreateAccount
    }
    ProfileFactory.getProfileById(user.uid)
    .then(profile => {
      $scope.notLoggedIn = false
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
