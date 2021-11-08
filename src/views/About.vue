<template>
  <div class="about-container">
    <v-card
        class="mx-auto"
        style="box-shadow: none;"
      >
        <v-card-title class="justify-center">
          API documentation
        </v-card-title>
      </v-card>

      <v-card
        class="about-card"
      >
        <v-card-title >
          Estructura
        </v-card-title>

        <v-card-subtitle>
          Las peticiones se realizan desde actions y los datos se actualizan en el store de vuex. 
          
          <br>
          <br>
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                type="string"
                label="Api endpoint"
                placeholder="Api endpoint"
                v-model="endpoint"
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-list-item-content>

              <v-btn
                rounded
                color="primary"
                class="ma-2"
                @click="changeApiEndpoint()"
              >
                Cambiar endpoint
                <v-icon
                  right
                  dark
                >
                  mdi-send
                </v-icon>
              </v-btn>
          </v-list-item>



        </v-card-subtitle>
        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn
            color="orange"
            text
            @click="show = !show"
          >
            Llamadas a la api
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <div v-for="(p, index) in functions">

              <v-card-text style="margin-left:2em;">
                <b>{{index + ". endpoint"+ p[0]}}</b>
              </v-card-text>
              <v-card-subtitle>
                Method: {{p[1]}}
              </v-card-subtitle>
              <v-card-text>
                {{p[2]}}
              </v-card-text>
            </div>
          </div>
        </v-expand-transition> 
      </v-card>

  </div>

</template>

<script>
export default {
  name: 'AboutData',
  components: {
  },
  mounted() {
    this.endpoint = this.$store.state.endpoint;
  },
  data: () => ({
    endpoint: "",
    show: false,
    functions: [
      ["/client/get" , "GET", "Result code 200"],
      ["/client/get/one/{id}" , "GET", "Result code 200"],
      ["/client/get/search" , "GET", "Result code 200"],
      ["/client/post" , "POST", "Result code 201"],
      ["/client/put" , "PUT", "Result code 200"],
      ["/client/delete/{id}" , "DELETE", "Result code 200"],
      ["/auth/login" , "POST", "Result code 201"],
      ]
  }),
  methods: {
    changeApiEndpoint(){
      this.$store.dispatch("setEndpoint", this.endpoint);
    }
  }
}
</script>

<style >
.about-container{
  margin: 1em;
}
</style>
