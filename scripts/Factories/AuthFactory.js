"use strict"

app.factory("AuthFactory", function($q){

  let createUser = (userObj) => {
    console.log(userObj, "userObj")
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch((error) => {
      let errorCode = error.code,
          errorMessage = error.message
    })
  }

  let loginUser = (userObj) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch((error) => {
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