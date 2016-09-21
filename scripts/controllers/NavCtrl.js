"use strict"

app.controller("NavCtrl", function(
  $scope,
  $window,
  $location,
  AuthFactory,
  ProfileFactory
  ){

  $scope.isLoggedIn = false
  $scope.userName = "Signed in as " + AuthFactory.currentUser.userName

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

  const currentProfile = () => {
    return AuthFactory.currentUser().then(user => {

      ProfileFactory.getProfileById(user.uid)
      .then((user)=>{
        $scope.userName = user.userName
      })
    })
  }
  currentProfile()

    AuthFactory.currentUser().then(() => {
    $scope.isLoggedIn = true;
  })



  // $scope.navItems = [
  //     {name: "Logout", url: "#/logout"},
  //     {name: "Start A Party", url: "#/party-form"},
  //     {name: "Your Profile", url: "#/userprofile"}
  // ]


  $scope.isActive = viewLocation => viewLocation === $location.path();



});