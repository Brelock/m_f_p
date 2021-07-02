
function CreateMap(mapID) {
  this.map = null;
  this.mapDiv = document.getElementById(mapID);
  this.mapData = this.mapDiv.dataset;
  this.center = { lat: Number(this.mapData.lat), lng: Number(this.mapData.lng) };  

  this.initMap = function(zoom) {
    zoom = zoom || 8;
    this.map = new google.maps.Map(this.mapDiv, {
      center: this.center,
      zoom: zoom,
    });

  }
}

function CreateMapDepartments(mapID, locations) {
  CreateMap.apply(this, arguments);

  locations = locations || [
    { lat: 47.857599, lng: 35.104645, title: 'hey', description: 'hey', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_1.jpg', number: '№55' },
    { lat: 47.858599, lng: 35.124645, title: 'fifafo', description: 'fifafo', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_2.jpg', number: '№143' },
    { lat: 48.857599, lng: 34.104645, title: 'elo', description: 'ole', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_3.jpg', number: '№245' },
    { lat: 49.857599, lng: 36.104645, title: 'raz', description: 'raz', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/Gulyajpole-276x300.jpg', number: '№3' },
  ];
  let infoWindows = [];
  let currentMark = null;

  this.panZoom = function() {
    this.map.panTo({lat: -25.363882, lng: 131.044922});
  }
  // start setCluster
  this.setCluster = function() {
    // Start markers array 
    let markers = locations.map(function(item, i) {

      let marker =  new google.maps.Marker({
        position: {lat: item.lat, lng: item.lng},
        icon: 'img/marker.png'
      });

      // Start info Windows
      let infoWindow = new google.maps.InfoWindow({
        content: `
                  <div class="lombard-map__image-wrapper">
                    <img class="lombard-map__image" src="${item.image}">
                  </div>
                  <div class="lombard-map__number">${item.number}</div>
                  <div class="lombard-map__location">${item.address_ru}</div>
                  <div class="lombard-map__phone">
                    <a href="tel:${item.phone}">${item.phone}</a>
                  </div>
                  <div class="lombard-map__description">${item.description}</div>
                  <div class="lombard-map__work-time">${item.time}</div>
                  <a href="${item.link}" class="lombard-map__link">${item.more}</a>
                  
                  `,
        width: 350

      });
      infoWindows.push(infoWindow);

      let hoverInfoWindow = new google.maps.InfoWindow({
        content: `<div>${item.number}</div>`
      });
      // End info Windows

      // Start Event listeners
      google.maps.event.addListener(marker, 'click', function() {
        for (let i=0; i < infoWindows.length; i++) {
          infoWindows[i].close();
        }
        hoverInfoWindow.close();
        infoWindow.open(this.map, marker);

        // start style image if noload
        // let $lombardMapImage = $('.lombard-map__image');
        // if( $lombardMapImage.outerWidth() < 50) {
        //   $lombardMapImage.hide();
        // }
        // end style image if noload
        currentMark = infoWindow;   
        // start show close btn
        $('.lombard-map__image-wrapper').closest('.gm-style-iw').next().show();
        // end show close btn
      });

      

      google.maps.event.addListener(marker, 'mouseover', function() {
        if (currentMark) return;
        hoverInfoWindow.open(this.map, marker);

      });

      google.maps.event.addListener(marker, 'mouseout', function() {
        hoverInfoWindow.close();
      });


      google.maps.event.addListener(infoWindow, 'closeclick', function() {
        currentMark = null;
      });
      // End Event listeners

      return marker;
    });
    // End markers array

    let markerCluster = new MarkerClusterer(this.map, markers, {
      // imagePath: 'img/cluster-image',
      styles: [{
        url: 'img/cluster-image.png',
        width: 42,
        height: 42,
        textColor: '#fff',
        textSize: 12
      }],
    });
  }
  // end setCluster
}

function CreateMapDepartment(mapID) {
  CreateMap.apply(this, arguments);

  this.setMarker = function() {
    let marker =  new google.maps.Marker({
      position: this.center,
      map: this.map,
      icon: 'img/marker.png'
    });
  }
}

let departmentsMap;

function initMap(locations) {
  // console.log('initMap()');
  // departments
  (function() {
    if ( ! $('#departmentsMap').length ) return;
    departmentsMap = new CreateMapDepartments('departmentsMap', locations);
    departmentsMap.initMap();
    departmentsMap.setCluster();    
  }());
  // end departments
   
  // department
  (function() {
    if ( ! $('#departmentMap').length ) return;
    let departmentMap = new CreateMapDepartment('departmentMap');
    departmentMap.initMap();
    departmentMap.setMarker();
  }());
  // end department
};

function locationZoom(location) {
  departmentsMap.panZoom(location);
}

// XMLHttpRequest for map's json template
function loadLocations() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/departments/get-departments/', true);
  xhr.send();
  xhr.onreadystatechange = function() {
    console.log( 'appa')
    if (this.readyState != 4) return;
    if (this.status != 200) {
      console.log( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    } else {
      console.log( xhr.responseText ); // responseText -- текст ответа.

      try {
        var locations = JSON.parse(xhr.responseText);
        console.log(locations);
      } catch (e) {
        console.log( "Некорректный ответ " + e.message );
      }

      initMap(locations);
    }
  }
};
// End XMLHttpRequest for map's json template

$(window).on("load", function() {
  let $cityItems = $('.chosen-results'); 

  $cityItems.on('click', function(e) {
    // loadLocations(); 
    console.log(e.target);
    initMap();
    locationZoom({lat: 47.857599, lng: 35.104645});
  });

  // loadLocations(); 

  // delete
  let locations = [
    { lat: 47.857599, lng: 35.104645, title: 'hey', description: 'hey', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_1.jpg', number: '№55' },
    { lat: 47.858599, lng: 35.124645, title: 'fifafo', description: 'fifafo', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_2.jpg', number: '№143' },
    { lat: 48.857599, lng: 34.104645, title: 'elo', description: 'ole', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/lombard_metall_3.jpg', number: '№245' },
    { lat: 49.857599, lng: 36.104645, title: 'raz', description: 'raz', address_ru: 'г. Запорожье, пр. Соборный,179', phone: '(067) 617-41-42', time: 'Пн-Вс, 8:00-20:00', more: 'Подробнее...', image: 'img/Gulyajpole-276x300.jpg', number: '№3' },
  ];
  initMap(locations);
  // end delete
});