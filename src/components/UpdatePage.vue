<template>
  <h1>Welcome to Update Restaurant page</h1>
  <form @submit.prevent="updateRestaurant" class="add">
    <input
      type="text"
      name="name"
      placeholder="Enter name"
      v-model="restaurant.name"
    />
    <input
      type="text"
      name="address"
      placeholder="Enter address"
      v-model="restaurant.address"
    />
    <input
      type="text"
      name="contact"
      placeholder="Enter contact"
      v-model="restaurant.contact"
    />
    <button>Add new Restaurant</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "UpdatePage",
  data() {
    return {
      restaurant: {
        name: "",
        address: "",
        contact: "",
      },
    };
  },
  methods: {
    async updateRestaurant() {
      const response = await axios.put(
        `http://localhost:3000/restaurant/${this.$route.params.id}`,
        {
          name: this.restaurant.name,
          address: this.restaurant.address,
          contact: this.restaurant.contact,
        }
      );
      if (response.status == 200) {
        this.$router.push({ name: "Home" });
      }
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    const response = await axios.get(
      `http://localhost:3000/restaurant/${this.$route.params.id}`
    );
    this.restaurant = response.data;
  },
};
</script>

<style></style>
