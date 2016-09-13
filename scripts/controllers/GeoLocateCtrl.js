"use strict"

app.controller("GeoLocateCtrl", function($scope){
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

      $scope.map = { center: { latitude: -17.7134, longitude: 178.0650 }, zoom: 8}
      $scope.initMap = function initMap() {
        console.log("are we working?")
        // var map = new google.maps.Map(document.getElementById('map'), {
        //   center: {lat: -34.397, lng: 150.644},
        //   zoom: 6
        // });
        // var infoWindow = new google.maps.InfoWindow({map: map});
        console.log(navigator.geolocation)

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              center: {

              latitude: position.coords.latitude,
              longitude: position.coords.longitude},

              zoom: 8

            };
            console.log(position, "position")
            $scope.map = pos

            $scope.$apply() // checks for changes, runs angular digest process
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // map.setCenter(pos);
          },
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
})