"use strict"

app.controller("LoginCtrl", function($scope, $window, AuthFactory){
  //form for users to register
  //tie form to scope to create object to pass to firebase to save that info
  $scope.account = {
    email: "",
    password: ""
  }

  $scope.register = () => {
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      $scope.loginFirstTime()
    },
    (error) => {
      console.log(error)
    })
  }

  $scope.loginFirstTime = () => {
    AuthFactory.loginUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((data) => {
      if(data) {
        $window.location.href = "#/profile"
      } else {
        $window.location.href = "#/login"
      }
    },
    error => {
      console.log(error)
    })
  }

  $scope.login = () => {
    AuthFactory.loginUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((data) => {
      if(data) {
        $window.location.href = "#/my-profile"
      } else {
        $window.location.href = "#/login"
      }
    },
    error => {
      console.log(error)
    })
  }
})
