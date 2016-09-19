"use strict"

app.factory("ProfileFactory", function($q, $http, FirebaseURL, $location, AuthFactory){

  let postProfile = (newProfile) => {
    newProfile.uid = AuthFactory.getUser().uid
    console.log("newProfile", newProfile.uid)
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

    let getProfiles = () => {
      let profiles = []
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}profiles.json`)
      .success((profileObj)=>{
        if (profileObj !== null){
          resolve(profileObj)
        } else {
          console.log(profileObj, "profile")
          resolve(profileObj)
        }
      })
      .error((error) => {
        reject(error);
      })
    })
  }

  let postPartyInvite = (guestId, partyId, partyName, status) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}profiles/${guestId}/${status}.json`,
      JSON.stringify({partyId, partyName}))
      .success((partyObjFromFirebase) => {
        console.log(partyObjFromFirebase, "new Party Invite")
        resolve(partyObjFromFirebase)
      })
      .error((error) => {
          reject(error)
      })
    })
  }

  let changePartyInvite = (guestId, partyId, partyName, rsvpKey, currentStatus, newStatus) => {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}profiles/${guestId}/${currentStatus}/${rsvpKey}json`)
      .success(() => {
        resolve(postPartyInvite(guestId, partyId, partyName, newStatus))
      })
      .error((error) => {
          reject(error)
      })
    })
  }

  let patchProfile = (profileId, updatedProfile) => {
    return $q((resolve, reject) => {
      $http.patch(`${FirebaseURL}profiles.${profileId}.json`,
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
    profileId = AuthFactory.getUser().uid
    console.log(profileId)
    return $q((resolve) => {
      $http.delete(`${FirebaseURL}profiles/${profileId}.json`)
      .success(profileObjFromFirebase => {
        console.log(profileObjFromFirebase)
        resolve(profileObjFromFirebase)
      })
    })
  }

  let getProfileById = (profileId) => {
    console.log(profileId, "profileId")
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}profiles.json?orderBy="uid"&equalTo="${profileId}"`)
      .success(profileObjFromFirebase => {
        console.log(profileObjFromFirebase)
        const id = Object.keys(profileObjFromFirebase)[0]
        const profile = profileObjFromFirebase[id]
        profile.id = id
        resolve(profile)
      })
      .error(error => {
        reject(error)
      })
    })
  }

  let getProfileByUserName = (userName) => {
    console.log(userName, "userName")
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}profiles.json?orderBy="userName"&equalTo="${userName}"`)
      .success((profileObjFromFirebase) => {
        console.log(profileObjFromFirebase, "profile from firebase")
        resolve(profileObjFromFirebase)
      })
      .error(error => {
        reject(error)
      })
    })
  }


  return {
    postProfile,
    deleteProfile,
    patchProfile,
    getProfiles,
    getProfileById,
    getProfileByUserName,
    postPartyInvite,
    changePartyInvite
  }

})



