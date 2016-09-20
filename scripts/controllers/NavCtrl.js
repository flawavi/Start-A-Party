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
    console.log("LOGMEOUT")
    AuthFactory.logoutUser().then(() => {
      $scope.isLoggedIn = false;
      $location.url("/login")
    })
  }

  const currentProfile = () => {
    return AuthFactory.currentUser().then(user => {
      console.log("USER", user)
      ProfileFactory.getProfileById(user.uid)
      .then((user)=>{
        $scope.userName = user.userName
      })
    })
  }
  currentProfile()

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

  AuthFactory.currentUser().then(() => {
    $scope.isLoggedIn = true;
  })

  $scope.navItems = [
      {name: "Logout", url: "#/logout"},
      {name: "Start A Party", url: "#/party-form"},
      {name: "Your Profile", url: "#/userprofile"}
  ]


  $scope.isActive = viewLocation => viewLocation === $location.path();



});