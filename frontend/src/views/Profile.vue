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
              <router-link to="/feed"><fa icon="house" /></router-link>
            </li>
            <li>
              <router-link to="/signup"><fa icon="gears" /></router-link>
            </li>
            <li>
              <router-link to="/profile"><fa icon="user" /></router-link>
            </li>
            <li>
              <button @click="logout()"><fa icon="right-from-bracket"/></button>
            </li>
          </ul>
        </div>
      </nav>
    </header>

<div class="jumbotron">
<h2 class="text-center"> {{ userData.data.lastName }} {{ userData.data.firstName }} </h2>
<div class="d-flex flex-row">
<div class="modif_avatar_image">
            <img class="user_avatar mr-2" v-if="userData.data.avatar != null" :src="require(`../../../backend/images/users/${userData.data.avatar}`)" />
            <img class="user_avatar mr-2" v-else src="../assets/avatar.png" />
  <span class="_modif_avatar_icon"><button class="btn btn-modif"><fa icon="pencil" />
            </button>
  </span>
</div>
<div>
<ul>
<li>Né(e) le {{ userData.data.dateOfBirth.split("-").reverse().join("/") }}</li>
<li>{{ userData.data.email }}</li>
<li>Profil crée le: {{ userData.data.createdAt.split("T")[0].split("-").reverse().join("/") }}</li>
<li>Poste occupé chez Groupomania: <input type="text" v-model="userData.data.service"/><button>Modifier</button></li>
</ul>
</div>
</div>
</div>
<!-- <div class="mt-5 mb-5">
<button class="btn btn-info mr-3">Modifier votre<br>mot de passe</button>
<button class="btn btn-info mr-3">Modifier l'intitulé<br>de votre poste</button>
<button class="btn btn-info">Modifier votre<br>photo de profil</button>
</div> -->
<p>Certaines informations ne sont pas modifiables depuis votre espace.</p>
<p>Si vous avez besoin d'effectuer une modification, veuillez contacter l'administrateur</p>

<button class="btn btn-danger" @click="deleteAccount()">Supprimer votre compte</button>
</div>
      
</template>

<script>
import axios from 'axios';

export default {
      name: "Profile",
      components:{
      
      },
  data() {
    return {
userData: {data: {
  dateOfBirth:"",
 createdAt:""
}},
userInfos:[],
    }
    },
    mounted(){
      this.createUserData();
      this.getUserInfos();
    },

      methods: {
    createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch(e) {
          localStorage.removeItem('user');
          console.log("Données corrompues");
        }
      }
    },

    getUserInfos(){
axios.get("http://localhost:3000/api/auth/" + this.userData.data.userId, { headers: {
            authorization: `Bearer: ${this.userData.data.token}` }} )
        .then((response) => {
          this.userInfos = response.data;
            console.log(response);
       
        })
    },
    logout(){
      localStorage.removeItem('user');
      this.$router.push("/");
    },
    deleteAccount(){
            if(window.confirm("Etes-vous sur de vouloir supprimer votre compte ?")){
        axios
          .delete("http://localhost:3000/api/auth/" + this.userData.data.userId, { headers: {
            authorization: `Bearer: ${this.userData.data.token}` }})
          .then(() => {
            localStorage.removeItem('user');
            this.$router.push("/signup");
          })
          .catch(error => console.log(error))
      }
    }
      }
}
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
button .btn-info{
  background: #0582ba;
}

.modif_avatar_image{
position: relative;
}
.modif_avatar_image img{
width: auto;
    object-fit: cover;
    height: 200px; 
}
span._modif_avatar_icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
}
</style>