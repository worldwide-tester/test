<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-toolbar-title >Usuarios registrados</v-toolbar-title>
    </v-toolbar>


    <v-data-table
              :headers="headers"
              :items="$store.state.users"
              sort-desc
              class="elevation-1"
              locale='es'
              :footer-props="{
                'items-per-page-text': 'Filas por página',
                'sort-by-text' : 'Ordenar por'
              }"
              :loading="loadingUserList"
              loading-text="Loading users..."
      >

    </v-data-table>
  </div>
</template>

<script>

export default {

    created() {
      this.setUsersList();
    },
    data: () => ({
      loadingUserList: true,
      headers: [
        { text: 'Nombre', value: 'nombre', sortable: true},
        { text: 'Correo', value: 'correo', sortable: false, align: 'center'},
        { text: 'Telefono', value: 'telefono', sortable: false, align: 'center'},
        { text: 'Fecha nacimiento', value: 'fechaNacimiento', sortable: true, align: 'center'},
      ],
    }),
    methods : {
      /**
       * Descarga e instancia la lista de usuarios.
       */
      async setUsersList() {
        // Para evitar acoplamiento en la vista
        await this.$store.dispatch('getUsers');
        this.loadingUserList = false;
      },
    }
}
</script>

