<template>
  <h1>Hello {{ name }}, welcome on Homepage</h1>
  <table border="1">
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Contact</th>
      <th>Address</th>
      <th>Actions</th>
    </tr>
    <tr v-for="item in restaurants" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.contact }}</td>
      <td>{{ item.address }}</td>
      <td>
        <router-link :to="'/update/' + item.id">Update</router-link> /
        <button @click="deleteRestaurant(item.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      name: "",
      restaurants: [],
    };
  },
  methods: {
    async deleteRestaurant(id) {
      const response = await axios.delete(
        "http://localhost:3000/restaurant/" + id
      );

      if (response.status == 200) {
        this.loadData();
      }
    },
    async loadData() {
      let response = await axios.get("http://localhost:3000/restaurant");
      try {
        this.restaurants = response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");

    if (!user) {
      this.$router.push({ name: "SignUp" });
    } else if (user) {
      this.name = JSON.parse(user).name;
    }

    this.loadData();
  },
};
</script>

<style>
td,
th {
  width: 160px;
  height: 40px;
}
td a{
  text-decoration: none;
  color: blue
}
td button{
  background: transparent;
  border: none;
  color: crimson;
  font-size: 16px;
  cursor: pointer;
}
</style>
