function initCommonMap() {  
  var map,
  mapDiv = document.getElementById('contactMap'),
  mapData = mapDiv.dataset;
  
  var center = { lat: Number(mapData.lat), lng: Number(mapData.lng) };
  var center2 = { lat: Number(50.43143536293431), lng: Number(30.62357789756082) };
 var lat = (center2.lat + center.lat) / 2;
 var lng = (center2.lng + center.lng) / 2;
 var result = {lng, lat}; 

  function initMap() {
    map = new google.maps.Map(mapDiv, {
      center: result,
      zoom: 6,
      type: "roadmap",
      gestureHandling: "cooperative",
      styles:  [
        {"elementType": "geometry", "stylers": [{ "color": "#212121"}]},
        {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
        {"elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
        {"elementType": "labels.text.stroke", "stylers": [{"color": "#212121"}]},
        {"featureType": "administrative", "elementType": "geometry", "stylers": [{"color": "#757575"}]},
        {"featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{"color": "#9e9e9e"}]},
        {"featureType": "administrative.land_parcel", "stylers": [{"visibility": "off"}]},
        {"featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{"color": "#bdbdbd"}]},
        {"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}]},
        {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#181818"}]},
        {"featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
        {"featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{"color": "#1b1b1b"}]},
        {"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#2c2c2c"}]},
        {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#8a8a8a"}]},
        {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#373737"}]},
        {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"color": "#3c3c3c"}]},
        {"featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{"color": "#4e4e4e"}]},
        {"featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{"color": "#616161"}]},
        {"featureType": "transit", "elementType": "labels.text.fill", "stylers": [{"color": "#757575" }]},
        {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}]},
        {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#3d3d3d"}]}
      ],
      // scrollwheel:        false,
      streetViewControl:  false,
      mapTypeControl:     false,
    });

    var icon = {
      url: "../img/location-pin.svg",
      scaledSize: new google.maps.Size(60, 60), 
    };
  
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      icon: icon,
      title: mapData.mapTitle
    });

    var marker = new google.maps.Marker({
      position: center2,
      map: map,
      icon: icon,
      title: mapData.mapTitle
    });
  
    let timer = null;
  
    google.maps.event.addDomListener(window, 'resize', function () {
      var documentWidth = document.documentElement.clientWidth;
    
      if (timer) {
        clearTimeout(timer);
      }
    
      timer = setTimeout(function() {
        timer = null;
        map.setCenter(center);
        documentWidth < 768 ? map.setZoom(3) : map.setZoom(4);
      }, 50);
    
    });
  }
  initMap()
}
