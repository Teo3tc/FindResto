<template>
  <div class="ui__btn2 btn__addResto" @click="btnForAddMaker($event)">
    <i class="fas fa-map-marker-alt"></i>
  </div>
</template>

<script>
import { useStore } from "vuex";
import mapTools from "../tools/mapTools";

export default {
  name: "BtnAddMarker",

  setup() {
    const store = useStore();

    const btnForAddMaker = (event) => {
      // change color
      event.target.style.color = "green";
      // change cursor for show
      mapTools.obecjtMap.setOptions({ draggableCursor: "pointer" });
      // listen event
      mapTools.obecjtMap.addListener("click", (event) => {
        // add Marker
        mapTools.addMarker(event.latLng);
        // mount form
        store.commit("dataChargeTrue");
        // find adresss with position
        mapTools.geocoder.geocode(
          { location: mapTools.markerOneNewResto.position },
          (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                // save Adreesse for put in form
                store.commit("pushAdressAndLatNewResto", results[0]);

                // show Form
                const form = document.querySelector("#formAddResto");
                form.style.zIndex = "3";
                form.style.opacity = "1";
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          }
        );
      });
    };
    return {
      btnForAddMaker,
    };
  },
};
</script>
<style lang="scss">
.ui__btn2 {
  grid-column: 1/-1;
  grid-row: 2/3;
  justify-self: center;
  align-self: center;
  display: grid;
  grid-template: 100%/ 100%;
  background: #3a4d62;
  box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
  padding: 1em;
  border-radius: 15px;
}
</style>

