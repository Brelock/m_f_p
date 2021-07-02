var deptsMap = null;

deptsMap = (function() {

  const app = {},
        mapDiv = document.getElementById('departmentsMap'),
        mapData = mapDiv.dataset,
        center = { lat: Number(mapData.lat), lng: Number(mapData.lng) };

  let departmentsMap = null,
      dumpyLocs = [
        { lat: 47.857599, lng: 35.104645, title: 'hey', description: 'hey', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar1.jpg', number: '№55' },
        { lat: 47.858599, lng: 35.124645, title: 'fifafo', description: 'fifafo', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar2.jpg', number: '№143' },
        { lat: 48.857599, lng: 34.104645, title: 'elo', description: 'ole', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar1.jpg', number: '№245' },
        { lat: 49.857599, lng: 36.104645, title: 'raz', description: 'raz', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/tovar2.jpg', number: '№3' },
      ],
      infoWindows = [],
      currentMark = null;

  app.settings = {
    "markerIconPath": "/img/marker.png",
    "clusterIconPath": "/img/cluster-image.png",
    "mapZoomLvl": 7,
  };

  const fn = {
    getParamsFromUrl(url, paramName) {
      const urlSplitted = url.split('?');
      let pathOnly = urlSplitted[0];
      let result = {
        pathOnly: pathOnly
      };

      if (urlSplitted && urlSplitted.length > 1) {
        const params = urlSplitted[urlSplitted.length - 1].split('&');
        for (let i = 0; i < params.length; i++) {
          let param = params[i];

          if (/#_=_/.test(param)) {
            param = param.replace('#_=_', '');    
          }

          const paramSplitted = param.split('=');
          result[ paramSplitted[0] ] = paramSplitted[1];
        }
      }

      return result;
    },

    initMap() {
      departmentsMap = new google.maps.Map(mapDiv, {
        center: center,
        zoom: app.settings.mapZoomLvl
      });
    },

    zoomToOffice({lat, lng, zoom}) {
      departmentsMap.panTo({ lat: Number(lat) , lng: Number(lng) });
      departmentsMap.setZoom(zoom);
    },

    zoom(zoom) {
      departmentsMap.setZoom(zoom);
    },

    createMarker(locationElement) {
      let marker =  new google.maps.Marker({
        position: {lat: Number(locationElement.lat) || 0, lng: Number(locationElement.lng) || 0},
        departmentId: locationElement.id,
        icon: app.settings.markerIconPath
      });

      return marker;
    },

    createInfoWindow(locationElement) {
      const image = locationElement.image_path;
      const { city } = locationElement;

      let infoWindow = new google.maps.InfoWindow({
        content: `
                  <div class="tcnstk__image-wrapper">
                    <img class="tcnstk__image" src="${image}">
                  </div>
                  <div class="tcnstk__number">
                    ${cite.handleTranslationResponse('title_', city)}, ${cite.handleTranslationResponse('address_', locationElement)}
                  </div>
                  <div class="tcnstk__location">
                    ${cite.handleTranslationResponse('title_', city)}, ${cite.handleTranslationResponse('address_', locationElement)}
                  </div>
                  <div class="tcnstk__work-time">${cite.handleTranslationResponse('work_time_', locationElement)}</div>
                  `,
        width: 270

      });

      return infoWindow;
    },

    createHoverInfoWindow(locationElement) {
      const { address_ru, address_uk } = locationElement;
      let address = cite.isRuLang() ? address_ru : address_uk;

      let hoverInfoWindow = new google.maps.InfoWindow({
        content: `<div class="tcnstk__hover-infow">${address}</div>`
      });

      return hoverInfoWindow;
    },

    openInfoWindow(marker, infoWindow, hoverInfoWindow) {
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

    addOnClickMarkerListener(marker, infoWindow, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'click', function() {
        for (let i=0; i < infoWindows.length; i++) {
          infoWindows[i].close();
        }
        hoverInfoWindow.close();
        infoWindow.open(departmentsMap, marker);

        currentMark = infoWindow;   
        $('.tcnstk__image-wrapper').closest('.gm-style-iw').next().show();
      })
    },

    addOnMouseOverMarkerListener(marker, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'mouseover', function() {
        if (currentMark) return;
        hoverInfoWindow.open(departmentsMap, marker);
      });
    },

    addOnMouseOutMarkerListener(marker, hoverInfoWindow) {
      google.maps.event.addListener(marker, 'mouseout', function() {
        hoverInfoWindow.close();
      });
    },

    addOnCloseInfoWindowListener(infoWindow) {
      google.maps.event.addListener(infoWindow, 'closeclick', function() {
        currentMark = null;
      });
    },

    createMarkersForCluster(departments) {
      let deptmnts = departments || dumpyLocs; 
      const { storeId } = fn.getParamsFromUrl(window.location.href);

      let markers = deptmnts.map(function(item, i) {

        let marker = fn.createMarker(item);
        let infoWindow = fn.createInfoWindow(item);
        infoWindows.push(infoWindow);
        let hoverInfoWindow = fn.createHoverInfoWindow(item);

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

    initCluster(markers) {
      let markerCluster = new MarkerClusterer(departmentsMap, markers, {
        styles: [{
          url: app.settings.clusterIconPath,
          width: 35,
          height: 35,
          textColor: '#fff',
          textSize: 12,
        }]
      });
    },

    decorator() {
      fn.initMap();
      fn.initCluster(fn.createMarkersForCluster());
    },
  };

  return fn;

})();