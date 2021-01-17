

<template>
  <div class="map"></div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import mapTools from "../tools/mapTools";
import { loader } from "../tools/loader";

export default {
  name: "Map",

  setup() {
    const store = useStore();

    const initFuckingMapIfGeoloc = (position) => {
      // save position geoloc
      mapTools.GeolocPostion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const request = {
        location: mapTools.GeolocPostion,
        radius: "1000",
        type: "restaurant",
        query: "restaurant",
        fields: ["place_id"],
      };
      // first request
      const service = new window.google.maps.places.PlacesService(
        mapTools.obecjtMap
      );
      service.nearbySearch(request, (results, status) => {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          //mapTools.nbrRequest = results.length
          mapTools.nbrRequest = results.length;
          // reset list Item
          store.commit("resetData");
          // delete maker in map
          mapTools.deleteMarkers(mapTools.markerResto);
          // center map to Geoloc
          mapTools.setCenter(position, 12);
          //  put marker user in the map
          mapTools.makeMarker(mapTools.GeolocPostion);
          results.map((r) => {
            var requestDetails = {
              placeId: r.place_id,
              fields: [
                "review",
                "formatted_address",
                "formatted_phone_number",
                "geometry",
                "website",
                "name",
                "rating",
              ],
            };
            // secon request more details
            const detailService = new window.google.maps.places.PlacesService(
              mapTools.obecjtMap
            );
            detailService.getDetails(requestDetails, (placeDetails, status) => {
              if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                // maker marker resto
                mapTools.makeMarkerResto(placeDetails);
                // put result in the list
                store.commit("pushNewData", placeDetails);
              }
            });
          });
        }
      });
    };
    const initFuckingGeloc = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initFuckingMapIfGeoloc);
      }
    };

    onMounted(() => {
      loader.load().then(() => {
        // init map
        const map = document.querySelector(".map");
        mapTools.initMap(map, mapTools.defaultCordonner, 14);
        // put maker resto
        store.state.data.map((d) => {
          mapTools.makeMarkerResto(d);
        });
        // ask for geoloc
        initFuckingGeloc();
      });
    });
    return {};
  },
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100vh;
}
</style>
