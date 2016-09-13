"use strict"

$("document").ready(function(){
var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.1627, lng: 86.7816},
    zoom: 8
  })
}

initMap()

})