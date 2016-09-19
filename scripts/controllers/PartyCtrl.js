"use strict"

app.controller("PartyCtrl", function(
  $scope,
  AuthFactory,
  $routeParams,
  currentParty,
  PartyFactory,
  ProfileFactory,
  currentProfile
  )
{

  $scope.map = { center: { latitude: currentParty.lat, longitude: currentParty.long }, zoom: 20}
  $scope.title = "P.A.R.T. Why?"
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
    return Object.keys(currentParty[rsvp] || {}.find(key => {
      return currentParty[rsvp][key].guestId === currentProfile.id
    }))
  }

  const getInviteKey = () => {
    const rsvp = getRSVPStatus()
    return Object.keys(currentProfile[rsvp] || {}.find(key => {
      return currentProfile[rsvp][key].partyId === $routeParams.id
    }))
  }

  $scope.rsvp = getRSVPStatus()

  $scope.changeRSVP = (newRsvp) => {
    const currentRsvp = $scope.rsvp
    const rsvpKey = getRSVPStatus()

    PartyFactory.changePartyRSVP(
      $routeParams.id,//partyId
      currentProfile.id,
      currentProfile.userName,
      rsvpKey,//current party invitation key
      currentRsvp,//existing status
      newRsvp//new status
    ).then((result) => {
      ProfileFactory.changePartyInvite(
        currentProfile.id,
        $routeParams.id,//partyId
        currentParty.partyName,
        getInviteKey(),
        currentRsvp,
        newRsvp
      ).then((result) => {
        delete currentParty[currentRsvp][rsvpKey]//removes rsvp key from object
        if (!currentParty[newRsvp]) currentParty[newRsvp] = {}//creates new "attending" list if one doesn't already exist
        currentParty[newRsvp][result.name] = {//adds user to new list
          guestId: currentProfile.id,
          userName: currentProfile.userName
        }
        refreshInvitees()
        $scope.rsvp = newRsvp
      })
    })
  }

})