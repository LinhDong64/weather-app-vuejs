<template>
  <div>
    <div v-if="cities.length === 0" class="no-cities">
      <p>No cities added, add a new one?</p>
      <button @click="addCity">Add city</button>
    </div>
    <div class="grid">
      <div class="city-link" v-for="(city, index) in cities" :key="index">
        <city :city="city" v-bind:edit="edit" />
      </div>
    </div>
  </div>
</template>

<script>
import City from "../components/City.vue";

export default {
  name: "add-city",
  props: ["cities", "edit"],
  created() {
    console.log(this.cities);
  },
  methods: {
    addCity() {
      this.$emit("add-city");
    },
  },
  components: {
    City,
  },
};
</script>

<style lang="scss" scoped>
.no-cities {
  position: absolute;
  min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

button {
  margin-top: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 500ms ease all;

  &:hover {
    outline: none;
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
}

.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>