<template>
  <div id="app">
    <div class="main">
      <div v-if="isLoading" class="loading">
        <span></span>
      </div>
      <div v-else class="app">
        <modal
          v-if="isShowModal"
          v-on:close-modal="toggleModal"
          v-bind:APIkey="APIkey"
          :cities="cities"
        />
        <navigation
          v-on:add-city="toggleModal"
          v-on:edit-city="toggleEdit"
          :addCityActive="addCityActive"
          :isDay="isDay"
          :isNight="isNight"
        />
        <router-view
          :isDay="isDay"
          :isNight="isNight"
          :cities="cities"
          v-bind:edit="edit"
          v-bind:APIkey="APIkey"
          v-on:is-day="dayTime"
          v-on:is-night="nightTime"
          v-on:resetDays="resetDays"
          v-on:add-city="toggleModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";
export default {
  name: "App",
  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "d29b13200af5b9f378902cd4971125e8",
      cities: [],
      isShowModal: null,
      edit: null,
      addCityActive: null,
      isLoading: true,
    };
  },
  created() {
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {
    async getCityWeather() {
      let firebaseDB = collection(db, "cities");
      const q = query(firebaseDB);

      onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length === 0) {
          this.isLoading = false;
        }
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === "added" && !change.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  change.doc.data().city
                }&units=imperial&appid=${this.APIkey}`
              );
              const data = response.data;
              updateDoc(doc(db, "cities", change.doc.id), {
                currentWeather: data,
              }).then(() => {
                this.cities.push(change.doc.data());
                this.isLoading = false;
              });
            } catch (err) {
              console.log(err);
            }
          } else if (change.type === "added" && change.doc.Nd) {
            this.cities.push(change.doc.data());
          } else if (change.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== change.doc.data().city
            );
          }
        });
      });
    },

    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
      console.log(this.addCityActive);
    },

    dayTime() {
      this.isDay = !this.isDay;
    },

    nightTime() {
      this.isNight = !this.isNight;
    },

    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  components: {
    Navigation,
    Modal,
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;

  .container {
    padding: 0 20px;
  }
}

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1s infinite;
  }
}
</style>
