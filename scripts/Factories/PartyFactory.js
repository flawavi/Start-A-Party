"use strict"

app.factory("PartyFactory", function($q, $http, FirebaseURL, AuthFactory){

  let postParty = (newParty) => {
    newParty.ownerID = AuthFactory.getUser().uid
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}parties.json`,
      JSON.stringify(newParty))
      .success((partyObjFromFirebase) => {
        console.log(partyObjFromFirebase, "new Party")
        resolve(partyObjFromFirebase)
      })
      .error((error) => {
          reject(error)
      })
    })
  }

  let patchParty = (partyId, updatedParty) => {
    return $q((resolve, reject) => {
      $http.patch(`${FirebaseURL}parties/${partyId}.json`,
      JSON.stringify(updatedParty))
      .success((partyObjFromFirebase) => {
        console.log(updatedParty, "updated Party")
        resolve(partyObjFromFirebase)
      })
      .error((error) => {
        reject(error)
      })
    })
  }

  let deleteParty = (partyId) => {
    partyId.uid = AuthFactory.getUser().uid
    partyId = partyId.uid
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}parties/${partyId}.json`)
      .success((partyObjFromFirebase) => {
        resolve(partyObjFromFirebase)
      })
    })
  }

    let getPartyById = (partyId) => {
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}parties/${partyId}.json`)
      .success((partyObjFromFirebase) => {
        resolve(partyObjFromFirebase)
      })
      .error((error) => {
        reject(error)
      })
    })
  }

  return {
    postParty,
    patchParty,
    deleteParty,
    getPartyById
  }

})