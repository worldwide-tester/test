<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div 
        class="d-flex align-center"
        @click="$router.push('/')"
      >        
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Virato"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="../assets/avirato.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://avirato.com/"
        target="_blank"
        text
      >
        <span class="mr-2">Avirato.com</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
  export default {
    name: 'TopBar',

    data: () => ({

    }),
  }
</script>
