"use strict"

app.factory("AuthFactory", function() {

  let service,
      initialized = false,
      userId = null

  let createUser = userObj => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
  }

  let loginUser = userObj => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
  }

  let logoutUser = () => {
    return firebase.auth().signOut()
  }

  let getUser = () => {
    return userId;
  }

  let currentUser = () => {
    return new Promise ((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        console.log("onAuthStateChanged resolves with ", user)
        userId = user;
        resolve(user)
      }, error => {
        reject(error)
      })
    })
  }



  let isAuthenticated = () => {
    return (firebase.auth().currentUser) ? true : false;
  };

  service = {currentUser, createUser, loginUser, logoutUser, isAuthenticated, getUser}

  return service

})