"use strict"

app.controller("InvitationCtrl", function($scope, AuthFactory, PartyFactory, ProfileFactory, SearchProfiles) {
  // $scope.searchText = SearchProfiles;

  $scope.message = "Who gon' be @ dis pardee??"

  $scope.invitation = {
    name: "",
    userName: "",
    age: "",
    city: ""
  }

  $scope.findUser = () => {
    ProfileFactory.getProfileByUserName($scope.userName)
      .then(response => {
        for (var key in response) {
        $scope.invitation = response[key]
        }
      })
  }

  $scope.profileID = AuthFactory.getUser().uid
  ProfileFactory.getProfileById($scope.profileID)
    .then(response => {
      for (var key in response) {
        $scope.userName = response[key].userName
        console.log($scope.userName)
      }
      ProfileFactory.getProfileByUserName($scope.userName)
        .then(response => {
          console.log(response)
          $scope.invitation = response[key]
        })
    })

})

