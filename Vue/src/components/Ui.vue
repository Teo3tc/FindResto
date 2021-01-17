<template>
  <div class="ui">
    <div class="ui__btn" @click="ui.moveUi($event)">
      <i class="iconList fas fa-list"></i>
    </div>
    <BtnAddMarker />
    <Filter />
    <div class="ui__btn2 btn__Filter" @click="btnFilter()">
      <i class="far fa-star"></i>
    </div>
  </div>
</template>

<script>
import ui from "../tools/ui";
import Filter from "./Filter";
import BtnAddMarker from "./BtnAddMarker";

export default {
  name: "Ui",
  components: {
    Filter,
    BtnAddMarker,
  },
  setup() {
    const btnFilter = () => {
      const filter = document.querySelector(".box__RangeStar");
      filter.classList.toggle("openFilter");
    };

    return {
      btnFilter,
      ui,
    };
  },
};
</script>
<style lang="scss">
.openFilter {
  opacity: 1 !important;
  transform: scaleY(1) !important;
}

.ui {
  position: relative;
  grid-column: 1/-1;
  grid-row: 1/-1;
  background: #3a4d62;
  display: grid;
  grid-template: auto / auto;
  align-self: flex-start;
  justify-self: end;
  padding: 0.5em;
  border-radius: 15px;
  grid-row-gap: 1em;
  margin-block-start: 1em;
  margin-inline-end: 1em;
  color: white;
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.ui__btn {
  grid-column: 1/-1;
  grid-row: 1/2;
  justify-self: center;
  align-self: center;
  display: grid;
  grid-template: 100%/ 100%;
  background: #3a4d62;
  box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
  padding: 1em;
  border-radius: 15px;
}
.btn__Filter {
  display: none;
}

@media screen and (max-width: 780px) {
  .ui {
    font-size: 4em;
  }
}
</style>

