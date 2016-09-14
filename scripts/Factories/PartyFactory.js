"use strict"

app.factory("PartyFactory", function($q, $http, FirebaseURL, $location){

  let postParty = (newParty) => {
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

  let patchParty = (partyId, updatedParty) => {
    return $q((resolve, reject) => {
      $http.patch(`${FirebaseURL}/parties.${partyId}.json`,
        JSON.stringify(updatedParty))
      console.log(updatedParty, "updated Party")
      .success((partyObjFromFirebase) => {
        $location.path("/home")
      })
      .error((error) => {
        reject(error)
      })
    })
  }


  let deleteParty = (partyId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}parties/${partyId}.json`)
      .success((partyObjFromFirebase) => {
        resolve(partyObjFromFirebase)
      })
    })

  }
  return {postParty, patchParty, deleteParty}

})