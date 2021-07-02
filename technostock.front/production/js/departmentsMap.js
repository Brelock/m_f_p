'use strict';

var deptsMap = null;

deptsMap = function () {

  var app = {},
      mapDiv = document.getElementById('departmentsMap'),
      mapData = mapDiv.dataset,
      center = { lat: Number(mapData.lat), lng: Number(mapData.lng) };

  var departmentsMap = null,
      dumpyLocs = [{ lat: 47.857599, lng: 35.104645, title: 'hey', description: 'hey', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar1.jpg', number: '№55' }, { lat: 47.858599, lng: 35.124645, title: 'fifafo', description: 'fifafo', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar2.jpg', number: '№143' }, { lat: 48.857599, lng: 34.104645, title: 'elo', description: 'ole', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar1.jpg', number: '№245' }, { lat: 49.857599, lng: 36.104645, title: 'raz', description: 'raz', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar2.jpg', number: '№3' }],
      infoWindows = [],
      currentMark = null;

  app.settings = {
    "markerIconPath": "/img/marker.png",
    "clusterIconPath": "/img/cluster-image.png",
    "mapZoomLvl": 7
  };

  var fn = {
    getParamsFromUrl: function getParamsFromUrl(url, paramName) {
      var urlSplitted = url.split('?');
      var pathOnly = urlSplitted[0];
      var result = {
        pathOnly: pathOnly
      };

      if (urlSplitted && urlSplitted.length > 1) {
        var params = urlSplitted[urlSplitted.length - 1].split('&');
        for (var i = 0; i < params.length; i++) {
          var param = params[i];

          if (/#_=_/.test(param)) {
            param = param.replace('#_=_', '');
          }

          var paramSplitted = param.split('=');
          result[paramSplitted[0]] = paramSplitted[1];
        }
      }

      return result;
    },
    initMap: function initMap() {
      departmentsMap = new google.maps.Map(mapDiv, {
        center: center,
        zoom: app.settings.mapZoomLvl
      });
    },
    zoomToOffice: function zoomToOffice(_ref) {
      var lat = _ref.lat,
          lng = _ref.lng,
          zoom = _ref.zoom;

      departmentsMap.panTo({ lat: Number(lat), lng: Number(lng) });
      departmentsMap.setZoom(zoom);
    },
    zoom: function zoom(_zoom) {
      departmentsMap.setZoom(_zoom);
    },
    createMarker: function createMarker(locationElement) {
      var marker = new google.maps.Marker({
        position: { lat: Number(locationElement.lat) || 0, lng: Number(locationElement.lng) || 0 },
        departmentId: locationElement.id,
        icon: app.settings.markerIconPath
      });

      return marker;
    },
    createInfoWindow: function createInfoWindow(locationElement) {
      var image = locationElement.image_path;
      var city = locationElement.city;


      var infoWindow = new google.maps.InfoWindow({
        content: '\n                  <div class="tcnstk__image-wrapper">\n                    <img class="tcnstk__image" src="' + image + '">\n                  </div>\n                  <div class="tcnstk__number">\n                    ' + cite.handleTranslationResponse('title_', city) + ', ' + cite.handleTranslationResponse('address_', locationElement) + '\n                  </div>\n                  <div class="tcnstk__location">\n                    ' + cite.handleTranslationResponse('title_', city) + ', ' + cite.handleTranslationResponse('address_', locationElement) + '\n                  </div>\n                  <div class="tcnstk__work-time">' + cite.handleTranslationResponse('work_time_', locationElement) + '</div>\n                  ',
        width: 270

      });

      return infoWindow;
    },
    createHoverInfoWindow: function createHoverInfoWindow(locationElement) {
      var address_ru = locationElement.address_ru,
          address_uk = locationElement.address_uk;

      var address = cite.isRuLang() ? address_ru : address_uk;

      var hoverInfoWindow = new google.maps.InfoWindow({
        content: '<div class="tcnstk__hover-infow">' + address + '</div>'
      });

      return hoverInfoWindow;
    },
    openInfoWindow: function openInfoWindow(marker, infoWindow, hoverInfoWindow) {
      hoverInfoWindow.close();
      infoWindow.open(departmentsMap, marker);

      fn.zoomToOffice({
        lat: marker.position.lat(),
        lng: marker.position.lng(),
        zoom: 18
      });

      currentMark = infoWindow;
      $('.tcnstk__image-wrapper').closest('.gm-style-iw').next().show();
    },
    addOnClickMarkerListener: function addOnClickMarkerListener(marker, infoWindow, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'click', function () {
        for (var i = 0; i < infoWindows.length; i++) {
          infoWindows[i].close();
        }
        hoverInfoWindow.close();
        infoWindow.open(departmentsMap, marker);

        currentMark = infoWindow;
        $('.tcnstk__image-wrapper').closest('.gm-style-iw').next().show();
      });
    },
    addOnMouseOverMarkerListener: function addOnMouseOverMarkerListener(marker, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        if (currentMark) return;
        hoverInfoWindow.open(departmentsMap, marker);
      });
    },
    addOnMouseOutMarkerListener: function addOnMouseOutMarkerListener(marker, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'mouseout', function () {
        hoverInfoWindow.close();
      });
    },
    addOnCloseInfoWindowListener: function addOnCloseInfoWindowListener(infoWindow) {
      google.maps.event.addListener(infoWindow, 'closeclick', function () {
        currentMark = null;
      });
    },
    createMarkersForCluster: function createMarkersForCluster(departments) {
      var deptmnts = departments || dumpyLocs;

      var _fn$getParamsFromUrl = fn.getParamsFromUrl(window.location.href),
          storeId = _fn$getParamsFromUrl.storeId;

      var markers = deptmnts.map(function (item, i) {

        var marker = fn.createMarker(item);
        var infoWindow = fn.createInfoWindow(item);
        infoWindows.push(infoWindow);
        var hoverInfoWindow = fn.createHoverInfoWindow(item);

        fn.addOnClickMarkerListener(marker, infoWindow, hoverInfoWindow);
        fn.addOnMouseOverMarkerListener(marker, hoverInfoWindow);
        fn.addOnMouseOutMarkerListener(marker, hoverInfoWindow);
        fn.addOnCloseInfoWindowListener(infoWindow);

        if (storeId && storeId == marker.departmentId) {
          // console.log('storeId ', marker, item);
          fn.openInfoWindow(marker, infoWindow, hoverInfoWindow);
        }

        return marker;
      });

      return markers;
    },
    initCluster: function initCluster(markers) {
      var markerCluster = new MarkerClusterer(departmentsMap, markers, {
        styles: [{
          url: app.settings.clusterIconPath,
          width: 35,
          height: 35,
          textColor: '#fff',
          textSize: 12
        }]
      });
    },
    decorator: function decorator() {
      fn.initMap();
      fn.initCluster(fn.createMarkersForCluster());
    }
  };

  return fn;
}();