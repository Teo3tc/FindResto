<template>
  <div class="cl1 rw1 yctr xctr w100 box__RangeStar grid-1x1">
    <div class="yctr xstrt h100" id="slider"></div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import noUiSlider from "nouislider";
import "nouislider/distribute/nouislider.css";
import mapTools from "../tools/mapTools";

export default {
  name: "Filter",

  setup() {
    onMounted(() => {
      const slider = document.getElementById("slider");
      noUiSlider.create(slider, {
        start: [0, 5],
        connect: true,
        step: 1,
        orientation: "vertical",
        tooltips: true,

        format: {
          // 'to' the formatted value. Receives a number.
          to: function (value) {
            return value + "";
          },
          // 'from' the formatted value.
          // Receives a string, should return a number.
          from: function (value) {
            return Number(value.replace("", ""));
          },
        },

        range: {
          min: 0,
          max: 5,
        },
      });
      slider.noUiSlider.on("update", function (values) {
        let items = document.querySelectorAll(".item");
        items = Array.from(items);
        items.map((item) => {
          if (
            parseInt(item.getAttribute("rankglobal"), 10) >=
              parseInt(values[0], 10) &&
            parseInt(item.getAttribute("rankglobal"), 10) <=
              parseInt(values[1], 10)
          ) {
            item.style.display = "grid";
            const MarkerMatch = mapTools.markerResto.filter((marker) => {
              if (item.getAttribute("title") == marker.title) {
                return item;
              }
            });

            MarkerMatch.forEach((marker) => {
              marker.setMap(mapTools.obecjtMap);
            });
          } else {
            const MarkerNotMatch = mapTools.markerResto.filter((marker) => {
              if (item.getAttribute("title") == marker.title) {
                return item;
              }
            });
            MarkerNotMatch.forEach((marker) => {
              marker.setMap(null);
            });
            item.style.display = "none";
          }
        });
      });
    });

    return {};
  },
};
</script>
<style lang="scss">
.box__RangeStar {
  grid-column: 1/-1;
  grid-row: 2/3;
  position: absolute;
  height: 5em;
  top: 300%;
  font-size: 2em;
  right: 37%;

  transform-origin: top;
  opacity: 0;
  transition: all 0.4s;
  transform: scaleY(0);
}
#slider {
  margin-inline-start: 1em;

  .noUi-tooltip {
    transform: translate(-50%, 0);
    font-size: 0.5em;
    background: none;
    color: white;
    //top: 26%;
    top: 0;
  }
}
</style>

