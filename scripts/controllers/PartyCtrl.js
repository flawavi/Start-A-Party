"use strict"

app.controller("PartyCtrl", function(
  $scope,
  $location,
  AuthFactory,
  $routeParams,
  currentParty,
  PartyFactory,
  ProfileFactory,
  currentProfile
  ){

  $scope.isOwner = null
  const checkIfOwner = () => {
    if (currentParty.ownerID === currentProfile.uid) {
      $scope.isOwner = true
    }
  }
  checkIfOwner()
  $scope.map = { center: { latitude: currentParty.lat, longitude: currentParty.long }, zoom: 20}
  $scope.partyName = currentParty.partyName
  $scope.party = currentParty
  $scope.partyID = $routeParams.id
  $scope.owner = AuthFactory.getUser().uid === currentParty.ownerID

  $scope.marker = {
    coords: {
      latitude: currentParty.lat,
      longitude: currentParty.long
    },
    id: 0
  }

  $scope.deleteParty = () => {
    console.log("clicked", "partyId")
    PartyFactory.deleteParty($scope.partyID)
    $location.url("/party-form")
  }

  const refreshInvitees = () => {
    $scope.invitedCount = Object.keys(currentParty.invited || {}).length
    $scope.attendingCount = Object.keys(currentParty.attending || {}).length
    $scope.declinedCount = Object.keys(currentParty.declined || {}).length
  }

  refreshInvitees()

  const getRSVPStatus = () => {
    const invitedKeys = Object.keys(currentParty.invited || {})
    const invited = invitedKeys.map(key => currentParty.invited[key])
    if (invited.find(inv => inv.guestId === currentProfile.id)) return "invited"

    const attendingKeys = Object.keys(currentParty.attending || {})
    const attending = attendingKeys.map(key => currentParty.attending[key])
    if (attending.find(inv => inv.guestId === currentProfile.id)) return "attending"

    const declinedKeys = Object.keys(currentParty.declined || {})
    const declined = declinedKeys.map(key => currentParty.declined[key])
    if (declined.find(inv => inv.guestId === currentProfile.id)) return "declined"
  }

  const getRSVPKey = () => {
    const rsvp = getRSVPStatus()
    return Object.keys(currentParty[rsvp] || {}).find(key => {
      return currentParty[rsvp][key].guestId === currentProfile.id
    })
  }

  const getInviteKey = () => {
    const rsvp = getRSVPStatus()
    return Object.keys(currentProfile[rsvp] || {}).find(key => {
      return currentProfile[rsvp][key].partyId === $routeParams.id
    })
  }

  $scope.rsvp = getRSVPStatus()

  $scope.changeRSVP = newRsvp => {
    const currentRsvp = $scope.rsvp
    const rsvpKey = getRSVPKey()
    const inviteKey = getInviteKey()

    PartyFactory.changePartyRSVP(
      $routeParams.id,//partyId
      currentProfile.id,//current user id
      currentProfile.userName,//current user username
      rsvpKey,//current party invitation key
      currentRsvp,//existing status
      newRsvp//new status
    ).then(partyResult => {
      ProfileFactory.changePartyInvite(
        currentProfile.id,
        $routeParams.id,//partyId
        currentParty.partyName,
        inviteKey,
        currentRsvp,
        newRsvp
      ).then(profileResult => {
        delete currentParty[currentRsvp][rsvpKey]//removes rsvp key from object
        if (!currentParty[newRsvp]) currentParty[newRsvp] = {}//creates new "attending" list if one doesn't already exist
        currentParty[newRsvp][partyResult.name] = {//adds user to new list
          guestId: currentProfile.id,
          userName: currentProfile.userName
        }
        delete currentProfile[currentRsvp][inviteKey]
        if (!currentProfile[newRsvp]) currentProfile[newRsvp] = {}//creates new "attending" list if one doesn't already exist
        currentProfile[newRsvp][profileResult.name] = {//adds user to new list
          partyId: $routeParams.id,
          partyName: currentParty.partyName
        }
        refreshInvitees()
        $scope.rsvp = newRsvp
      })
    })
  }

})