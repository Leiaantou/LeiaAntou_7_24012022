<template>
  <div class="container">
    <HeaderConnect />
    <Post />
    <Footer />
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import HeaderConnect from "../components/HeaderConnect.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Feed",
  components: {
    Post,
    HeaderConnect,
    Footer,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped></style>
