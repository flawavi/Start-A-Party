"use strict"

app.factory("ProfileFactory", function($q, $http, FirebaseURL, $location){

  let postProfile = (newProfile) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/profiles.json`,
      JSON.stringify(newProfile))
      .success((objFromFirebase) => {
        console.log(objFromFirebase, "new Profile object")
        resolve(objFromFirebase)
      })
      .error((error) => {
        reject(error)
      })
    })
  }

  let patchProfile = (profileId, updatedProfile) => {
    return $q((resolve, reject) => {
      $http.patch(`${FirebaseURL}/profiles.${profileId}.json`,
      JSON.stringify(updatedProfile))
      .success((profileObjFromFirebase) => {
        $location.path("/home")
      })
      .error((error) => {
        reject(error)
      })
    })
  }

  let deleteProfile = (profileId) => {
    return $q((resolve) => {
      $http.delete(`${FirebaseURL}profiles/${profileId}.json`)
      .success((profileObjFromFirebase) => {
        resolve(profileObjFromFirebase)
      })
    })
  }

  return {
    postProfile,
    deleteProfile,
    patchProfile
  }

})



