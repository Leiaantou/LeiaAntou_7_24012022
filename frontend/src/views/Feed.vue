<template>
  <div class="container">
    <header>
      <nav class="d-flex flex-row justify-content-around align-items-center">
        <div class="logo_brand d-flex flex-row">
          <img class="logo_navbar" src="../assets/essaifavicon.png" alt="" />
          <h1>Groupomania</h1>
        </div>
        <div>
          <ul class="d-flex flex-row">
            <li>
              <router-link to="/"><fa icon="house" /></router-link>
            </li>
            <li>
              <router-link to="/signup"><fa icon="gears" /></router-link>
            </li>
            <li>
              <router-link to="/profile"><fa icon="user" /></router-link>
            </li>
            <li>
              <router-link to="/"><fa icon="right-from-bracket"/></router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Affichage des posts -->
    <Post />
  </div>
</template>

<script>
// import axios from "axios";
import Post from "../components/Post.vue";

export default {
  name: "Feed",
  components: {
    Post,
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        image: "",
        userId: "",
      },

      allPosts: [],
    };
  },

  methods: {},
};
</script>

<style scoped>
.logo_navbar {
  width: 50px;
}

.logo_brand {
  margin-right: 8rem;
}

h1 {
  color: #0582ba;
  font-size: 25px;
  padding-top: 10px;
}

nav {
  background-color: lightskyblue;
  height: 50px;
}
a{
  color: #0582ba;
}
ul {
  list-style: none;
  margin-top: 15px;
}

li {
  margin-left: 40px;
}

icon {
  color: #0582ba;
}
</style>
