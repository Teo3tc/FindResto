<template>
  <div
    :title="dat.name"
    :rankglobal="rattingGeneral(dat)"
    class="item cl1 xctr ystrt grid-full-fluid rgp-10"
    v-for="dat in data"
    :key="dat.name"
  >
    <div class="imgStreet">
      <img :data-src="putImage(dat)" class="lazyload" alt="" />
    </div>
    <div class="desc grid-full-fluid rgp-05">
      <!--Name -->
      <h2 class="cl1 yctr">{{ dat.name }}</h2>
      <!--Rating -->
      <div class="cl1 xstrt grid-full-fluid cgp-10">
        <div class="cl1 rankNbr">
          <p class="">{{ rattingGeneral(dat) }}</p>
        </div>
        <div class="cl2 starsRank grid-full-fluid">
          <span class="xctr yctr cl1">
            <span v-html="ui.makeStar(rattingGeneral(dat))"></span>
          </span>
        </div>
      </div>
    </div>
    <div class="info grid-full-fluid rgp-10">
      <p>
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        {{ dat.formatted_address }}
      </p>
      <p>
        <i class="fas fa-phone-alt" aria-hidden="true"></i>
        {{
          dat.formatted_phone_number != undefined
            ? dat.formatted_phone_number
            : "Non renseigné"
        }}
      </p>
      <p>
        <i class="fas fa-globe" aria-hidden="true"></i>
        <a :href="dat.website"
          >&nbsp;{{
            dat.website != undefined ? "Site Internet" : "Non renseigné"
          }}</a
        >
      </p>
    </div>
    <div class="listAvis grid-full-fluid rgp-10">
      <h6
        :title="dat.name"
        v-if="dat.reviews != undefined"
        class="btnEnable cl1 rw1 xstrt"
        @click="ui.openAvis"
      >
        Avis {{ dat.reviews.length }}
      </h6>
      <h6 v-else class="btnDisabled xstrt">Avis 0</h6>
      <h6 class="btnEnable cl2 rw1 xend" @click="openFormAvis">
        Rédiger un avis
      </h6>
      <div id="formAvis" :title="dat.name" class="cl1-2 rw2">
        <form
          action=""
          class="cl1-1 rw2 xctr yctr grid-fuild-5 rgp-10"
          @submit.prevent="onSubmit"
        >
          <input
            v-model="review.author_name"
            class="cl1-1 rw1 check"
            type="text"
            name="author"
            id="author"
            placeholder="nom"
            required
          />
          <input
            v-model="review.rating"
            class="cl1-1 rw2 check"
            type="text"
            id="rank"
            placeholder="Note 1-5"
            title="Nombre entre 0 et 5"
            required
            pattern="[0-5]{1}"
          />
          <textarea
            v-model="review.text"
            class="cl1-1 rw3 check"
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            required
            placeholder="Partagez votre expérience"
          ></textarea>
          <input class="cl1-1 rw4" type="submit" id="bouton" value="Send" />
        </form>
      </div>
      <ul :title="dat.name" class="cl1-2 rw3 grid-full-fluid rgp-10">
        <li
          class="grid-full-fluid rgp-10"
          v-for="reviews in dat.reviews"
          :key="reviews.time"
        >
          <a
            :href="reviews.author_url"
            class="review__author cl1 rw1 xstrt grid-full-fluid w100"
          >
            <p class="cl1 rw1 xstr">
              <span><i class="far fa-user"></i></span>&nbsp;&nbsp;<span>{{
                reviews.author_name
              }}</span>
            </p>
          </a>
          <!--<a class="cl2 rw1 xend review__authorImg" :href="reviews.author_url"><img  :src="reviews.profile_photo_url" alt=""></a>-->
          <div class="review__rating cl1 xstrt grid-full-fluid cgp-10">
            <div class="cl1 rankNbr">
              <p class="">{{ reviews.rating }}</p>
            </div>
            <div class="cl2 starsRank grid-full-fluid">
              <span class="xctr yctr cl1"
                ><span v-html="ui.makeStar(reviews.rating)"></span
              ></span>
            </div>
          </div>
          <p class="review__text cl1 rw3 xstrt">
            <i class="fas fa-pencil-alt"></i>&nbsp;&nbsp;{{ reviews.text }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

import ui from '../tools/ui'

import "lazysizes";

export default {
  name: "Item",

  setup() {
    let review = { name: "", author_name: "", rating: "", text: "" };
    const store = useStore();
    const data = computed(() => store.state.data);
    const rattingGeneral = (data) => {
      if (data.rating != undefined) {
        //return data.rating
        let note = 0;
        data.reviews.forEach((dat) => {
          note = note + parseInt(dat.rating, 10);
        });
        note = note / data.reviews.length;
        return note.toFixed(1);
      } else {
        return 0;
      }
    };
    
    const openFormAvis=(e)=>{
        // reset Value
        const check = document.querySelectorAll(".check");
        check.forEach((chek) => (chek.value = ""));
        console.log(review)
        const el = e.target;
        const parent = e.target.parentElement;
        const form = parent.querySelector("#formAvis");
        // push name of restaurant for after compare
        review.name = form.getAttribute("title");
        // Toogle form
        if (form.style.maxHeight) {
          form.style.maxHeight = null;
          form.style.opacity = "0";
          el.classList.remove("btnOpen");
        } else {
          form.style.maxHeight = form.scrollHeight + "px";
          form.style.opacity = "1";
          el.classList.add("btnOpen");
        }
    }



    const onSubmit = (e) => {
      store.commit("saveNewReview", review);
      store.commit("pushNewReview");
      
      const form = e.target.parentElement;
      form.style.maxHeight = null;
      form.style.opacity = "0";
      form.previousSibling.classList.remove("btnOpen");
      console.log(review)
    };
    const putImage = (dat) => {
      let lat;
      let lng;
      try {
        lat = dat.geometry.location.lat();
        lng = dat.geometry.location.lng();
      } catch (e) {
        if (e instanceof TypeError) {
          lat = dat.geometry.location.lat;
          lng = dat.geometry.location.lng;
        }
      }
      return `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&fov=90&heading=90&pitch=0&key=KEY_API`;
    };
    return {
      data,
      putImage,
      review,
      onSubmit,
      rattingGeneral,
      openFormAvis,
      ui
    };
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: white;
}
a:hover {
  text-decoration: underline;
}
.check {
  background: #3a4d62;
  box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
  padding: 0.5em 1em;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 1.2em;
  padding-left: 0.5em;
}
#bouton {
  background: #3a4d62;
  box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
  padding: 0.5em 1em;
  border-radius: 15px;
  border: none;
  color: white;
  font-size: 1.2em;

  justify-self: center;
}
#formAvis {
  overflow: hidden;
  max-height: 0;
  transition: opacity 0.4s;
  opacity: 0;
  form {
    margin: 1em 1em;
    padding: 0.5em 0;
  }
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 0.7; /* Firefox */
}
.item {
  //padding: 2em;
  //border: 1px solid black;
  border-radius: 25px;
  background: rgba($color: #3a4d62, $alpha: 1);

  //background: rgba($color: #4f6b6f, $alpha: 0.5);
  width: 90%;
}

.imgStreet {
  border-radius: 25px;
  overflow: hidden;
  background: #3a4d62;
  box-shadow: inset 7px 7px 14px #25313f, inset -7px -7px 14px #4f6985;

  & img {
    width: 100%;
  }
}

.desc {
  padding: 0 1em;
}

.info {
  padding: 0 1em;

  p {
    font-size: 1em;
    font-weight: 300;
    text-align: left;
  }
}
.btnOpen {
  background: #3a4d62 !important;
  box-shadow: inset 8px 8px 14px #334456, inset -8px -8px 14px #41566e !important;
}
ul {
  list-style: none;
  padding: 0;
  max-height: 0;
  opacity: 0;
  transition: opacity 0.4s;
  margin-bottom: 1em;

  li {
    border-radius: 15px;
    background: #3a4d62;
    box-shadow: inset 8px 8px 14px #334456, inset -8px -8px 14px #41566e;
    padding: 1em 1em;
  }
  .review__author {
    //display: flex;
    //gap: 1em;
    margin: 0 0.5em;
    img {
      width: 3em;
    }
    p {
      text-align: left;
      font-size: 1.2em;
      font-weight: 300;
      align-self: center;
    }
  }
  .review__text {
    font-size: 1.2em;
    text-align: justify;
    font-weight: 300;
    line-height: 1.4;
    margin: 0 0.5em;
  }
}
.listAvis {
  padding: 0 1em 0em;
  overflow: hidden;
  h6 {
    font-size: 1.2em;
    font-weight: 300;
    transition: all 0.4s;
    padding: 0.2em 1em;
  }
  .btnEnable {
    border-radius: 25px;
    background: linear-gradient(145deg, #3e5269, #344558);
    box-shadow: 7px 7px 14px #25313f, -7px -7px 14px #455a71ab;
    cursor: pointer;
  }
  .btnEnable:hover {
    border-radius: 25px;
    background: linear-gradient(145deg, #344558, #3e5269);
    box-shadow: 7px 7px 14px #25313f, -7px -7px 14px #4f698561;
  }
}
.rankNbr {
  background: #3a4d62;
  box-shadow: 8px 8px 14px #334456, -8px -8px 14px #41566e;
  padding: 0.5em 1em;
  border-radius: 15px;
}

.starsRank {
  border-radius: 15px;
  background: #3a4d62;
  box-shadow: inset 8px 8px 14px #334456, inset -8px -8px 14px #41566e;
  padding: 0.5em 1em;
}

p {
  font-size: 1.5em;
  text-align: center;
}

h2 {
  font-weight: 400;
}
</style>

