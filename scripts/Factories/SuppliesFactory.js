"use strict"

app.factory("SuppliesFactory", function($q, $http, FirebaseURL){

  let postSupplies = (supplies, partyID) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/supplies/${partyID}.json`,
      JSON.stringify(supplies))
      .success(objFromFirebase => {
        resolve(objFromFirebase)
      })
      .error((error) => {
        reject(error)
      })
    })
  }

  return {postSupplies}
})