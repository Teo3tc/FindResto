<template>
<div id='list' class="xend grid-full-fluid w100">
    <div class=" cl1 rw1 xctr ystrt grid-full-fluid rgp-20 pt-10 w100" >
        <Item />
    </div>
   
</div>
</template>

<script>

import Item from './Item'
export default {
    name: "List",
    components: {
        Item
    },

};
</script>

<style lang="scss">
#list {
    color: white;
    transform: translateX(100%);
    overflow: scroll;

}
#list::-webkit-scrollbar {
  display: none;
}
#list {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

</style>
