"use strict"

app.factory("ProfileFactory", function($q, $http, FirebaseURL, $location, AuthFactory){

    let getProfiles = (userId) => {
      console.log(userId)
      let profiles = []
    return $q((resolve, reject) => {
      console.log(userId);
      $http.get(`${FirebaseURL}profiles.json?orderBy="uid"`)
      .success((profileObj)=>{
        console.log(profileObj, "profileObj")
        if (profileObj !== null){
          resolve(profileObj)
        } else {
          console.log(profileObj, "profile")
          resolve(profileObj)
        }
      })
      .error((error) => {
        reject(error);
      })//.success does parsing for us
    })
  }


  let postProfile = (newProfile) => {
    newProfile.uid = AuthFactory.getUser().uid;
    console.log("newProfile", newProfile)
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
    patchProfile,
    getProfiles
  }

})



