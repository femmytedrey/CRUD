<template>
  <HeaderVue />
  <router-view />
</template>

<script>
// import SignUp from "./components/SignUp.vue"
import HeaderVue from "./components/HeaderVue.vue";

export default {
  name: "App",
  components: {
    // SignUp,
    HeaderVue,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding: 0;
  margin: 0;
}

.logo {
  width: 150px;
  margin: 0 auto;
}
.register input,
.login input,
.add input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button,
.login button,
.add button {
  width: 320px;
  height: 40px;
  background: skyblue;
  border: 1px solid skyblue;
  cursor: pointer;
  color: white;
}
</style>
