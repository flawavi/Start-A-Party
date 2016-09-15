"use strict"

app.factory("AuthFactory", function() {

  let service,
      initialized = false


  let createUser = userObj => {
    console.log(userObj, "userObj")
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
  }

  let loginUser = userObj => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
  }

  let logoutUser = () => {
    return firebase.auth().signOut()
  }

  let currentUser = () => {
    return new Promise ((resolve, reject) => {
      if (initialized) return resolve(firebase.auth().currentUser)
      let unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, error => {
        initialized = true
        unsubscribe()
        reject(error)
      })
    })
  }

  let isAuthenticated = () => currentUser.then(user => !!user)

  service = {currentUser, createUser, loginUser, logoutUser, isAuthenticated}

  return service

})