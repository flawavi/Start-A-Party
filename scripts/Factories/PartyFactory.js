"use strict"

app.factory("PartyFactory", function($q, $http, FirebaseURL, $location){

  let createParty = (newParty) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/parties.json`,
        JSON.stringify(newParty))
      console.log(newParty, "new Party")
        .success((partyObjFromFirebase) => {
          resolve(partyObjFromFirebase)
          })
        .error((error) => {
          reject(error)
        })
      })
    }

    let createProfile = (newProfile) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/profiles.json`,
        JSON.stringify(newProfile))
      console.log(newProfile, "new Profile")
        .success((profileObjFromFirebase) => {
          resolve(profileObjFromFirebase)
        })
        .error((error) => {
          reject(error)
        })
      })
    }

  let editParty = () => {

  }

  let deleteParty = () => {

  }
  return {createParty, editParty, deleteParty}

})