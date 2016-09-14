"use strict"

app.factory("ProfileFactory", function($q, $http, FirebaseURL, $location){

  let createProfile = (newProfile) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/profiles.json`,
        JSON.stringify(newProfile))
      console.log(newProfile, "new Profile")
        .success((objFromFirebase) => {
          resolve(objFromFirebase)
        })
        .error((error) => {
          reject(error)
        })
      })
    }

    let deleteProfile = () => {

    }

    let editProfile = () => {

    }
    return {createProfile}
})