<template>
  <img class="logo" src="../assets/resto-logo.png" alt=";ogo" />
  <h1>Sign Up</h1>
  <div class="register">
    <input type="text" placeholder="Enter Name" v-model="name" />
    <input type="email" placeholder="Enter Email" v-model="email" />
    <input type="password" placeholder="Enter Password" v-model="password" />
    <button @click="register">Sign Up</button>
  </div>
  <p>
    <router-link to="/login">Login</router-link>
  </p>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "SignUp",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/user",
          {
            name: name.value,
            email: email.value,
            password: password.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // log user in automatically after registration
        if (response.status == 201) {
          console.log("user created successfully");
          const loginResponse = await axios.get(
            `http://localhost:3000/user?email=${email.value}&password=${password.value}`
          );

          if (loginResponse.data.length > 0 && loginResponse.status === 200) {
            const user = loginResponse.data[0];
            localStorage.setItem("user-info", JSON.stringify(user));
            const token = `Bearer ${user.id}`;
            localStorage.setItem("token", token);
            router.push({ name: "Home" });
          } else {
            throw new Error("Login failed");
          }
        } else if (!response.ok) {
          throw new Error("Error fetching data");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    onMounted(() => {
      let user = localStorage.getItem("user-info");
      if (user) {
        router.push({ name: "Home" });
      }
    });

    return {
      name,
      email,
      password,
      register,
    };
  },
};
</script>

<style></style>
