<template>
  <div class="container">
    <Header />
    <main>
      <p class="welcome row d-flex justify-content-center text-center">
        Afin d'accèder au réseau social, merci de complèter les informations
        suivantes
      </p>

      <div class="row d-flex justify-content-center">
        <div class="connexion jumbotron">
          <form>
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input
                v-model="dataSignup.lastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder="Doe"
                aria-describedby="lastName"
                required
                minlength="2"
              />
            </div>
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                v-model="dataSignup.firstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder="John"
                required
                aria-describedby="firstName"
                minlength="2"
              />
            </div>
            <div class="form-group">
              <label for="dateOfBirth">Date de naissance</label>
              <input
                v-model="dataSignup.dateOfBirth"
                type="date"
                class="form-control"
                id="dateOfBirth"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Adresse mail</label>
              <p class="help">(Vous devez utiliser votre email groupomania)</p>
              <input
                v-model="dataSignup.email"
                type="email"
                class="form-control"
                id="email"
                pattern=".+@groupomania\.com"
                placeholder="jdoe@groupomania.com"
                aria-describedby="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="service">Poste occupé</label>
              <input
                v-model="dataSignup.service"
                type="text"
                class="form-control"
                id="service"
                aria-describedby="service"
                placeholder="Commercial"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <p class="help">(entre 8 et 20 caractères, sans espace et au minimum 1 chiffre, 1 minuscule et 1 majuscule)</p>
              <input
                v-model="dataSignup.password"
                type="password"
                class="form-control"
                id="password"
                required
                minlength="8"
                placeholder="********"
              />
            </div>
            <div class="form-group">
              <label for="passwordConfirmation"
                >Confirmer votre mot de passe</label
              >
              <input
                v-model="dataSignup.passwordConfirmation"
                type="password"
                class="form-control"
                id="passwordConfirmation"
                required
                minlength="8"
                placeholder="********"
              />
              <p
                v-if="dataSignup.password !== dataSignup.passwordConfirmation"
                class="errorMsg"
              >
                Veuillez confirmer votre mot de passe
              </p>
            </div>
            <p id="signupError"></p>

            <button
              @click="signup()"
              :disabled="checkDataSignup()"
              type="submit"
              class="col btn btn-success mt-5"
            >
              S'inscrire
            </button>
          </form>
          <div class="text-center mt-5 mb-2">Déjà inscrit ?</div>
          <router-link class="col btn btn-primary" to="/"
            >Se connecter
          </router-link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  name: "Signup",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      dataSignup: {
        lastName: "",
        firstName: "",
        dateOfBirth: "",
        email: "",
        service: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataSignup() {
      const regexEmail = /[a-z0-9]+@groupomania.com/g;
      const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}$/g;
      const regexAlpha =
        /^[a-zA-Zçñàéèêëïîôüù][a-zA-Zçñàéèêëïîôüù\- '\\.]{1,25}$/g;
      if (
        this.dataSignup.email !== null &&
          this.dataSignup.lastName !== null &&
          this.dataSignup.firstName !== null &&
          this.dataSignup.service !== null &&
          this.dataSignup.password !== null &&
        regexPassword.test(this.dataSignup.password) &&
        regexEmail.test(this.dataSignup.email) &&
        regexAlpha.test(this.dataSignup.lastName) &&
        regexAlpha.test(this.dataSignup.firstName)
      )
        return true;

    },

    signup() {
      axios
        .post("http://localhost:3000/api/auth/signup", this.dataSignup)
        .then((response) => {
          console.log(response);
          alert("Inscription validée, connectez vous !")
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error)
                    const errorMsg = document.getElementById("signupError");
          errorMsg.textContent =
            "Champ(s) manquants ou erronés";
          });
    },
  },
};
</script>

<style scoped>
.connexion {
  width: 50%;
}
.errorMsg {
  color: red;
}
#signupError{
  color: red;
  text-align: center;
}
.help{
  font-size: 10px;
  margin: 0px;
}

@media screen and (max-width: 768px) {
  .container {
    margin-left: 0px;
  }
  p.welcome {
    margin-left: 14px;
    margin-top: 10px;
  }
}
</style>
