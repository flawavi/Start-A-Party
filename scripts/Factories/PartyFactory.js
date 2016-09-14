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

  let editParty = () => {

  }

  let deleteParty = () => {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}parties/${partyId}.json`)
      .success((partyObjFromFirebase) => {
        resolve(partyObjFromFirebase)
      })
    })

  }
  return {createParty, editParty, deleteParty}

})