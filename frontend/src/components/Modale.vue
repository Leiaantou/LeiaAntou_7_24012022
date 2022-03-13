<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>

    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <h2>Modification de votre post</h2>
      <p> {{post.id}} {{post.content}} </p>
      <article>
      <div class="form-group">
          <label for="content"></label>
          <textarea rows="5" class="form-control" :value="post.content"></textarea>
      </div>
      <div class="form-control">
          <label for="image"></label>
          <input type="file" class="form-class"/>
      </div>
      <button class="btn btn-info" @click="editPost(post.id)"><fa icon="paper-plane" /></button>
    </article>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Modale",
  props: ["revele", "toggleModale", "post"],
  data() {
      return{
          userData: { data: {} },
          postData: { data: {}},
      }
  },
  mounted(){
      this.createUserData(),
      this.getOnePost()

  },
  methods: {

    getOnePost() {
                    axios.get("http://localhost:3000/api/post/",{        
                    headers: {
            Authorization: `Bearer: ${this.userData.data.token}`,
          }
                    })
          .then(response => {
          localStorage.setItem("post",JSON.stringify(response));
            })
            .catch(error => {
                console.log(error)
            })
    },

        createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },

    editPost(){
        console.log(this.post);
    }
  },
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(51, 51, 51, 0.5);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 30%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
