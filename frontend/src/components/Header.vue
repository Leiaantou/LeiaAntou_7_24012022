<template>
    <nav class="d-flex flex-row justify-content-around align-items-center">
      <div>
        <img
          class="logo"
          src="../assets/icon-left-font-monochrome-black-removebg.png"
          alt=""
        />
      </div>
      <div>
        <ul class="d-flex flex-row">
          <li><router-link to="/"> Se connecter</router-link></li>
          <li><router-link to="/Signup">S'inscrire</router-link></li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
nav.a {
  color: black;
}

nav {
  background-color: lightskyblue;
  height: 50px;
}
.logo {
  height: 150px;
}

ul {
  list-style: none;
  margin-top: 15px;
}

li {
  margin-left: 40px;
}
</style>