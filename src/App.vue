<template>
  <v-app>
    <top-bar/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import './styles/colors.css';

  export default {
    name: 'App',

    data: () => ({
      //
    }),

    components: {
        TopBar,
    },
  };
</script>
