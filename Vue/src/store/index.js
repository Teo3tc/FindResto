
import { createStore } from 'vuex'

import dataJson from '../data/data.json'

const state = {
  data: dataJson,
  dataCharge:false,
  newPreview:[{ name: "", author_name: "", rating: "", text: "" }],
  newResto:[{
    geometry: {
        location: {
            lat:0.0,
            lng: 0.0
        }
    },
    name: "",
    rating: 0,
    reviews: [{
            author_name: "",
            rating: 0,
            text: ""
        },
    ],
    adr_address: "",
    formatted_phone_number: undefined,
    website: undefined
},],
  
}
const getters ={
  showData(state){
    return console.log(state.data); 
  },
  showAdressNewResto(state){
    return state.newResto[0].formatted_address
  }
}
const mutations = {
  pushNewData(state,data){
    state.data.push(data)
  },
  resetData(state){
    state.data = []
  },
  pushNewRestoInData(state){
    state.data.unshift(state.newResto[0])
    state.newResto = [{
      geometry: {
         location: {
              lat:0,
              lng:0,
          }
      },
      name: "",
      rating: '',
      reviews: [{
              author_name: "",
              rating: 0,
              text: ""
          },
      ],
      adr_address: "",
      formatted_phone_number: undefined,
      website: undefined
  },] 
  },
  pushAdressAndLatNewResto(state,data) {
    state.newResto[0].formatted_address = data.formatted_address
    state.newResto[0].geometry.location.lat = data.geometry.location.lat
    state.newResto[0].geometry.location.lng = data.geometry.location.lng
  },
  pushNewResto(state,data) {
    state.newResto[0].name = data.name
    state.newResto[0].rating = data.reviews.rating
    state.newResto[0].formatted_phone_number = data.formatted_phone_number
    state.newResto[0].website = data.website
    state.newResto[0].reviews[0] = data.reviews

  },
  dataChargeTrue(state){
      state.dataCharge = true
  },
  saveNewReview(state,data){
    state.newPreview[0].name = data.name
    state.newPreview[0].author_name = data.author_name
    state.newPreview[0].rating = data.rating
    state.newPreview[0].text = data.text
  },
  pushNewReview(state){
    state.data.map((data)=>{
        if (data.name == state.newPreview[0].name){
            if (data.reviews != undefined) {
               data.reviews.unshift(state.newPreview[0])
            }else{
               data.reviews = [state.newPreview[0]]
            }
        }
    })
    state.newPreview=[{ name: "", author_name: "", rating: "", text: "" }]
  }
}

 

export default createStore({
  state,
  mutations,
  getters
})