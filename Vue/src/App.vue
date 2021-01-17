

<template>
  <Map class="cl1-1 rw1-1 layer1" />
  <Ui />
  <List class="list cl1-1 rw1-1 layer2" />
  <FormAddResto v-if="store.state.dataCharge === true" />
</template>

<script>
import Map from "./components/Map";
import List from "./components/List";
import Ui from "./components/Ui";
import FormAddResto from "./components/FormAddResto";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    Map,
    List,
    Ui,
    FormAddResto,
  },

  setup() {
    const store = useStore();

    return {
      store,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/T-grid.scss";
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap");

.translateList {
  transform: translateX(0) !important;
}
* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
}

#app {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  font-size: 0.73vw;
  overflow: hidden;
}

.list {
  grid-column: 8/-1;
  grid-row: 1/-1;
  transition: all 0.5s ease-in-out;
  transform: translateX(100%);
}
@media screen and (max-width: 1024px) {
      #app{font-size: 1.3vw;}

  .list {
    grid-column: 7/-1;
  }
}
@media screen and (max-width: 768px) {
   #app{font-size: 0.7vw;}
  .list {
    grid-column: 3/-1;
    font-size: 4em;
  }
}


</style>
