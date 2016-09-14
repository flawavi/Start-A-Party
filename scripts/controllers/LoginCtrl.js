"use strict"

app.controller("LoginCtrl", function($scope, $window, AuthFactory){
  //form for users to register
  //tie form to scope to create object to pass to firebase to save that info
  $scope.account = {
    email: "",
    password: ""
  }

  $scope.register = () => {
    console.log("clicked register")
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then((userData)=>{
      console.log(userData)
      $scope.login()
    },
    (error) => {
      console.log(`Error creating user: ${error}`)
    })
  }

  $scope.login = () => {
    console.log("you logged in")
    AuthFactory.loginUser($scope.account)
    .then((data) => {
      if(data) {
        $window.location.href = "#/profile"
      } else {
        $window.location.href = "#/login"
      }
      console.log("data", data)
    },
    (error) => {
      console.log("hello error", error)
    })
  }
})