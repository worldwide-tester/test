<template>
  <div class="login">
    <v-container fluid fill-height align-center justify-center  class="">
          <v-card
            class="login-card"
            :loading="loading"
            align=center
          >
            <v-img
              class="login-image"
              src="../assets/logo.png"
            ></v-img>

            <v-card-text>
              <br>
              <div>
                <v-form>
                    <v-text-field v-on:keyup.enter="signIn" type="text" v-model="email" placeholder="Correo"></v-text-field>
                    <v-text-field v-on:keyup.enter="signIn" type="password" v-model="password" placeholder="Contraseña"></v-text-field>
                </v-form>
                <v-btn
                  rounded
                  color="primary"
                  class="ma-2 white--text"
                  @click="login"
                >
                  Iniciar sesión
                </v-btn>
              </div>
              <div class="login-description">
                {{errorMsg}}
              </div>

            </v-card-text>
          </v-card>
    </v-container>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  name: 'Login',
  created() {
  },
  components: {
  },
  data: () => ({
      loading: false,
      email: "",
      password: "",
      errorMsg: "Inicie sesión con correo y contraseña.",
  }),
  methods:{
    validParams() {
        if (this.email != "" && this.password != "")
            return true;
        else 
            return false;
    },
    setToken(token) {
        this.$store.commit('setToken', token);
        this.$router.replace('/');
    }, 
    async login() {
        if (!this.validParams) {
            this.errorMsg = "Invalid mail/password"
        }
        try {
            this.loading = true;
            const body = {
                "email": this.email,
                "password": this.password,
            }

            // CHANGE
            // Quedaría mejor como promesa devuelta de un módulo de vuex dedicado a autenticación
            const response = await axios.default.post(this.$store.state.endpoint+"/auth/login", body);
            console.log(response)
            if(response.status == 201 || response.status == 200) {
                const token = response.data.access_token;
                this.setToken(token);
                this.loading = false;
            } else {
                console.error(response);
                this.loading = false;
            }
        } catch (err) {
            console.log(err);
            this.errorMsg = "Petition error."
            this.loading = false;
        }

    }
  },
};
</script>

<style scoped>
.login-card {
  max-width:20em;
  width:30em;
}
.login-image {
  margin-top: 1em;
  width: 50%;
}
.login-description {
  margin-top: 2em;
}
.login-title {
  margin-top: 1em;
}
.login {
  height: 100%;
  background-color: #EBF6FE;
}
</style>
