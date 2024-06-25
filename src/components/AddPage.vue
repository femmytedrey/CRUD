<template>
  <h1>Welcome to Add Restaurant page</h1>
  <form @submit.prevent="addRestaurant" class="add">
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
  name: "AddPage",
  data() {
    return {
      restaurant: {
        id: 0,
        name: "",
        address: "",
        contact: "",
      },
    };
  },
  methods: {
    async addRestaurant() {
      const getId = await axios.get("http://localhost:3000/restaurant");
      this.restaurant.id = (getId.data.length + 1).toString();

      const response = await axios.post(
        "http://localhost:3000/restaurant",
        {
          id: this.restaurant.id,
          name: this.restaurant.name,
          address: this.restaurant.address,
          contact: this.restaurant.contact,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.status == 201) {
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
