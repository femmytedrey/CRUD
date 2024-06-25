<template>
  <img class="logo" src="../assets/resto-logo.png" alt=";ogo" />
  <h1>Login</h1>
  <div class="login">
    <input type="email" placeholder="Enter Email" v-model="email" />
    <input type="password" placeholder="Enter Password" v-model="password" />
    <button @click="login">Login</button>
  </div>
  <p>
    <router-link to="/sign-up">Sign Up</router-link>
  </p>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user?email=${email.value}&password=${password.value}`
        );
        if (response.data.length > 0 && response.status == 200) {
          const user = response.data[0];
          localStorage.setItem("user-info", JSON.stringify(user));
          const token = `Bearer ${user.id}`;
          localStorage.setItem("token", token);
          router.push({ name: "Home" });
        } else {
          throw new Error("Bad request");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    onMounted(() => {
      let user = localStorage.getItem("user-info");
      if (user) {
        router.push({ name: "Home" });
      }
    });

    return { email, password, login };
  },
};
</script>

<style></style>
