"use strict"

app.factory("AuthFactory", function($q){

  //create new user
  let createUser = (userObj) => {
    //all firebase interactions with sdk return promises themselves,
    //so we dont have to write promises explicity
    console.log(userObj, "userObj")
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch((error) => {
      let errorCode = error.code,
          errorMessage = error.message
    })
  }

  let loginUser = (userObj) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch((error)=>{
      let errorcode = error.code,
          errorMessage = error.message
    })
  }

  let logoutUser = () => {
    return firebase.auth().signOut()
  }

  let isAuthenticated = () => {
    return (firebase.auth().currentUser) ? true : false
  }

  return {createUser, loginUser, logoutUser, isAuthenticated}

})