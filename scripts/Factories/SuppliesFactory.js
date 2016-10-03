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

  // let getSupplies = (supplies, partyID, suppliesID) => {
  //   return $q((resolve, reject) => {
  //     $http.post(`${FirebaseURL}/supplies/${partyID}/${suppliesID}.json`,
  //     JSON.stringify(supplies))
  //     .success(objFromFirebase => {
  //       resolve(objFromFirebase)
  //     })
  //     .error((error) => {
  //       reject(error)
  //     })
  //   })
  // }

  let getSupplies = () => {
    let supplies = []
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}supplies.json`)
      .success(profileObj => {
        if (profileObj !== null){
          resolve(profileObj)
        } else {
          resolve(profileObj)
        }
      })
      .error((error) => {
        reject(error);
      })
    })
  }

  return {postSupplies, getSupplies}
})