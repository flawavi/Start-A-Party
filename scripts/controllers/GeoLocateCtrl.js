"use strict"

app.controller("GeoLocateCtrl", function($scope, $log, $timeout, $location){

  $scope.goToMyProfile = () => {
    $location.url("/my-profile")
  }

  $scope.message = "hello"

  $scope.map = { center: { latitude: -17.7134, longitude: 178.0650 }, zoom: 8}

  $scope.options = {scrollwheel: false};

  $scope.coordsUpdates = 0;
  $scope.dynamicMoveCtr = 0;
  $scope.marker = {
    id: 0,
    coords: {
      latitude: 43.14246967921588,
      longitude: -102.6595885925293
    },

    options: {draggable: true},

    events: {
      dragend: function (marker, eventName, args) {
        $log.log('marker dragend');
        var lat = marker.getPosition().lat();
        var lon = marker.getPosition().lng();
        $log.log(lat);
        $log.log(lon);
        $scope.marker.options = {
          draggable: true,
          labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
          labelAnchor: "100 0",
          labelClass: "marker-labels"
        }
      }
    }
  }
  $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
    if (_.isEqual(newVal, oldVal))
      return;
    $scope.coordsUpdates++;
  });
  $timeout(function () {
    $scope.marker.coords = {
      latitude: 42.1451,
      longitude: -100.6680
    };
    $scope.dynamicMoveCtr++;
    $timeout(function () {
      $scope.marker.coords = {
        latitude: 43.1451,
        longitude: -102.6680
      };
      $scope.dynamicMoveCtr++;
    }, 2000);
  }, 1000);

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

            zoom: 20

          };
        console.log(position, "position")
        $scope.map = pos

        $scope.$apply()
        // checks for changes, runs angular digest process
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