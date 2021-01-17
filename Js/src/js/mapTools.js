
import iconUser from '../assets/img/iconUser.svg'
import iconResto from '../assets/img/iconred.svg'
import iconAdd from '../assets/img/markerAdd.svg'
import {itemData, makeItem,deleteItem} from './item'

export const mapTools = {
  defaultCordonner: {
    lat: 48.8865035,
    lng: 2.3442197,
  },
  style : [{
    stylers: [{
        visibility: 'off',
    } ],
},
{
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
        visibility: 'on',
    }, ],
},
{
    featureType: 'road',
    elementType: 'label',
    stylers: [{
        visibility: 'on',
    }, ],
},
],
  obecjtMap: {},
  markerResto: [],
  markerOneNewResto:[],
  markerNewResto:[],
  markerGeoloc: {},
  geolocPostion: {},
  geocoder:{},
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
  listenMarkerReso:function(marker){
    window.google.maps.event.addListener(marker, 'click', function () {
     let items = document.querySelectorAll('.item')
     // make array
     items = Array.from(items);

      // filter onClick if item and marker Match (ref :title)
     const itemMatchMarker = items.filter((item)=>{
       if (item.getAttribute('title') === marker.title){
         return item
       }
     })
      // filter onClick if item and marker NOT Match (ref :title)
     const itemNotMatchMarker = items.filter((item)=>{
      if (item.getAttribute('title') != marker.title){
        return item
      }
    })
    // effet if match
     itemMatchMarker[0].scrollIntoView({
      behavior: 'smooth',
    });
    const itemUl = itemMatchMarker[0].querySelector('ul');
    itemUl.style.maxHeight = itemUl.scrollHeight + 'px';
    // effect if not match
    itemMatchMarker[0].querySelector('h2').style.color = 'red'
    itemNotMatchMarker.map(not=>{
      not.querySelector('h2').style.color = 'black'
      const itemUl = not.querySelector('ul');
      itemUl.style.maxHeight = null;
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
  setMapOnAll:function(map) {
    for (let i = 0; i < mapTools.markerResto.length; i++) {
      mapTools.markerResto[i].setMap(map);
    }
  },
  
// Removes the markers from the map, but keeps them in the array.
clearMarkers:function() {
  mapTools.setMapOnAll(null);
},

 deleteMarkers:function(marker) {
  mapTools.clearMarkers();
  marker = [];
},

setMapOnAll2:function(map) {
  for (let i = 0; i < mapTools.markerNewResto.length; i++) {
    mapTools.markerNewResto[i].setMap(map);
  }
},
clearMarkers2:function() {
  mapTools.setMapOnAll2(null);
},

 deleteMarkers2:function(marker) {
  mapTools.clearMarkers2();
  marker = [];
},
addMarker:function(location) {
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
makeMarkerNewResto:function(result){

  const marker = new window.google.maps.Marker({
    map:mapTools.obecjtMap,
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
initFuckingMapIfGeoloc:function(position){
  // save position geoloc
   mapTools.GeolocPostion = {
       lat: position.coords.latitude,
       lng: position.coords.longitude,
   }
   
   const request = {
       location: mapTools.GeolocPostion,
       radius: '1000',
       type: 'restaurant',
       query: 'restaurant',
       fields: ['place_id'],
   };
       // first request
       const service = new window.google.maps.places.PlacesService(mapTools.obecjtMap);
       service.nearbySearch(request, ((results, status) => {
           if (status == window.google.maps.places.PlacesServiceStatus.OK) {

               deleteItem()
               // reset list Item
               // delete maker in map
               mapTools.deleteMarkers(mapTools.markerResto)
               // center map to Geoloc
               mapTools.setCenter(position, 12)
               //  put marker user in the map 
               mapTools.makeMarker(mapTools.GeolocPostion)
               results.map(r => {
                  
                   var requestDetails = {
                       placeId: r.place_id,
                       fields: [
                           'review',
                           'formatted_address',
                           'formatted_phone_number',
                           'geometry',
                           'website',
                           'name',
                           'rating'
                       ],
                   };
                   // secon request more details
                   const detailService = new window.google.maps.places.PlacesService(mapTools.obecjtMap);
                   detailService.getDetails(requestDetails, ((placeDetails, status) => {
                       if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                           // maker marker resto
                           mapTools.makeMarkerResto(placeDetails)
                           // put result in the list 
                           itemData.push(placeDetails)
                           makeItem(placeDetails)
                       }
                   }));
               })
           }
       }));
  
},
initFuckingGeloc:function(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(mapTools.initFuckingMapIfGeoloc)
  }
}

}


//export default mapTools;
