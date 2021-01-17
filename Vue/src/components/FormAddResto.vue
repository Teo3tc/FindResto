<template>
<div id="formAddResto"  class="cl1-1 rw1-1 w100 h100 xctr yctr grid-full-fluid">
  <div class=" insideForm  cl1 rw1 xctr yctr grid-full-fluid">
      <div class="xend arrowBack"  @click="closeForm($event)"><i class="fas fa-arrow-right"></i></div>
      <div class=" grid-full-fluid rgp-10 ">
        <p>Nouveau restaurant à l'adresse suivrante:</p>
        <p class=" ">{{newResto}}</p>
      </div>
      <form class=" grid-full-fluid rgp-20 " @submit.prevent="onSubmit2">
        <input class="checkAddResto" type="text" id='name' v-model="formNewResto.name" placeholder="Nom du restaurant"  required>
        <div class="errorName xctr ystrt">
              <p>Se restaurant existe déja</p>
        </div>
        <input class=" checkAddResto" type="text" v-model="formNewResto.formatted_phone_number"  placeholder="Numéro de téléphone">
        <input class=" checkAddResto" type="text" v-model="formNewResto.website" placeholder="Site internet">
        <div class=" grid-full-fluid rgp-10 ">
        <p>Laissez le 1er comentaire</p>
         <input class=" checkAddResto" v-model="formNewResto.reviews.author_name" type="text" name="author" id="author" placeholder="Pseudo" required  />
          <input  class="checkAddResto" v-model="formNewResto.reviews.rating" type="text" id="rank" placeholder="Note 1-5" title="Nombre entre 0 et 5" required pattern="[0-5]{1}" />
          <textarea  class=" checkAddResto" v-model="formNewResto.reviews.text" name="comment" id="comment" cols="30" rows="5" required placeholder="Partagez votre expérience"  ></textarea>
          <input class="" type="submit" id="bouton" value="Send"/>
        </div>
      </form>
  </div>
</div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import mapTools from '../tools/mapTools'


export default {
    name: "FormAddResto",

  setup(){
    let formNewResto = {name:'',formatted_phone_number:'',website:'',reviews:{author_name:'',rating:'',text:''}}
    const store = useStore()
    // take the adress save when add maker
    const newResto = computed(() => store.state.newResto[0].formatted_address)
    const onSubmit2 = ()=>{
    let sameName = false
       store.state.data.map(d => {
            if(formNewResto.name === d.name){
              const errorName = document.querySelector('#name')
              errorName.value = 'Se restaurant existe déja'
              errorName.style.color = 'red'
              setTimeout(function () {
                  errorName.style.color = 'white';
                  errorName.value = ''
              }, 2000);
              return sameName = true
            }
        })
        if(sameName !== true){
          store.commit('pushNewResto',formNewResto)  
          store.commit('pushNewRestoInData')
          mapTools.makeMarkerNewResto(store.state.data[0])
          closeForm()
        }
    }

    const closeForm = ()=>{
      const form = document.querySelector('#formAddResto')
      const iconAdd = document.querySelector('.fa-map-marker-alt')
      mapTools.deleteMarkers2()
      form.style.zIndex = '0'
      form.style.opacity = '0'
      window.google.maps.event.clearListeners(mapTools.obecjtMap, 'click');
      iconAdd.style.color = 'white'
    }

    return{
      closeForm,
      onSubmit2,
      newResto,
      formNewResto, 
    }
  }
}
</script>
<style lang="scss">


#formAddResto{
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.4s;
  color: white;
  .insideForm{
     background: #3a4d62;
    padding: 2em 4em;
    border-radius: 25px;
    height: 90%;

    .arrowBack{
      background: #3a4d62;
      box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
      padding: 0.5em 1em;
      border-radius: 50px;
      border: none;
      color: white;
      font-size: 1.2em;
      align-self: center;
    }
     .arrowBack:hover{
            background: linear-gradient(145deg, #344558, #3e5269);
            box-shadow: 7px 7px 14px #25313f, -7px -7px 14px #4f698561;
        }
  }

  input,textarea{
    background: #3a4d62;
    box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
    padding: 0.5em 1em;
    border-radius: 15px;
    border: none;
    color: white;
    font-size: 1.2em;
    padding-left: 0.5em;
  }
  .errorName{
    font-size: 1em;
    opacity: 0;
    transform: translateY(-100px);
    transition: all 0.4s ease;
    border: 1px solid red;
    color: red;
    padding: 1em;
    border-radius: 50px;
    margin-top: 10%;
    display: none
  }
  .showError{
    opacity: 1;
    transform: translateY(0);
    display: block
  }
}
@media screen and (max-width: 780px) {
  #formAddResto{
    font-size: 4em;

  }
  .insideForm{
    width: 98%;
    padding: 1em 2em;
    height: 98%!important;

  }
}
</style>

