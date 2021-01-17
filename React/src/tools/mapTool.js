
//import iconPlayer from '../assets/img/map-marker-alt-solid.svg'
//import icon from "../assets/img/iconred.svg"
import { loader } from "./loader"
import iconUser from '../assets/img/iconUser.svg'
import iconResto from '../assets/img/iconred.svg'
import iconAdd from '../assets/img/markerAdd.svg'

export const mapTools = {

  defaultCordonner: {
    lat: 48.8865035,
    lng: 2.3442197,
  },
  style: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ],
  obecjtMap: {},
  markerResto: [],
  markerOneNewResto: [],
  markerNewResto: [],
  markerGeoloc: {},
  geolocPostion: {},
  geocoder: {},
  initMap: function (idMap, cordonner, zoom) {
    mapTools.obecjtMap = new window.google.maps.Map(idMap, {
      center: {
        lat: cordonner.lat,
        lng: cordonner.lng,
      },
      zoom: zoom,
      styles: mapTools.style
    })

  },
  setCenter: function (cordonner, zoom) {
    mapTools.geolocPostion = {
      lat: cordonner.coords.latitude,
      lng: cordonner.coords.longitude,
    }
    mapTools.obecjtMap.setCenter(mapTools.geolocPostion, zoom)

  },
  makeMarkerResto: function (result) {

    const marker = new window.google.maps.Marker({
      map: mapTools.obecjtMap,
      position: result.geometry.location,
      title: result.name,
      icon: {
        url: iconResto,
        scaledSize: new window.google.maps.Size(30, 30), // scaled size
      },
    });
    mapTools.markerResto.push(marker)
    mapTools.listenMarkerReso(marker)
  },
  listenMarkerReso: function (marker) {
    window.google.maps.event.addListener(marker, 'click', function () {
      let items = document.querySelectorAll('.item')
      items = Array.from(items);


      const itemMatchMarker = items.filter((item) => {
        if (item.getAttribute('title') === marker.title) {
          return item
        }
      })
      const itemNotMatchMarker = items.filter((item) => {
        if (item.getAttribute('title') != marker.title) {
          return item
        }
      })
      itemMatchMarker[0].scrollIntoView({
        behavior: 'smooth',
      });
      itemMatchMarker[0].querySelector('h2').style.color = 'red'
      itemNotMatchMarker.map(not => {
        not.querySelector('h2').style.color = 'black'
      })

    })
  },
  makeMarker: function (position) {

    mapTools.markerGeoloc = new window.google.maps.Marker({
      position: position,
      icon: {
        url: iconUser,
        scaledSize: new window.google.maps.Size(30, 30), // scaled size
      },
      map: mapTools.obecjtMap,
      title: 'Vous étes ici',
    });

  },
  setMapOnAll: function (map) {
    for (let i = 0; i < mapTools.markerResto.length; i++) {
      mapTools.markerResto[i].setMap(map);
    }
  },

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers: function () {
    mapTools.setMapOnAll(null);
  },

  deleteMarkers: function (marker) {
    mapTools.clearMarkers();
    marker = [];
  },

  setMapOnAll2: function (map) {
    for (let i = 0; i < mapTools.markerNewResto.length; i++) {
      mapTools.markerNewResto[i].setMap(map);
    }
  },
  clearMarkers2: function () {
    mapTools.setMapOnAll2(null);
  },

  deleteMarkers2: function (marker) {
    mapTools.clearMarkers2();
    marker = [];
  },
  addMarker: function (location) {
    //let saveAdrress;
    mapTools.markerOneNewResto = new window.google.maps.Marker({
      position: location,
      map: mapTools.obecjtMap,
      icon: {
        url: iconAdd,
        scaledSize: new window.google.maps.Size(30, 30), // scaled size
      },
    });
    mapTools.markerNewResto.push(mapTools.markerOneNewResto);
    window.google.maps.event.clearListeners(mapTools.obecjtMap, 'click');

    mapTools.obecjtMap.setOptions({
      draggableCursor: ''
    })
  },
  makeMarkerNewResto: function (result) {
    loader.load().then(() => {

      const marker = new window.google.maps.Marker({
        map: mapTools.obecjtMap,
        position: result.geometry.location,
        title: result.name,
        icon: {
          url: iconResto,
          scaledSize: new window.google.maps.Size(30, 30), // scaled size
        },
      });
      mapTools.markerResto.push(marker)
      mapTools.listenMarkerReso(marker)
    })
  },

}


//export default mapTools;
