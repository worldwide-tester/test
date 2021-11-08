<template>
  <div class="view-container">
    <DialogBox ref="resultDialog"></DialogBox>
    <DialogBox ref="confirmationDialog"></DialogBox>
    <!-- User's detail dialog -->
    <template>
      <v-row justify="center">
        <UserDetail class="z-to-front"
          @updateDialogShow="updateDialogShow"
          v-bind:selectedElement="selectedUser"
          v-bind:dialog="userDetailsDialog"
          v-bind:newUser="newUserFlag"
          >
        </UserDetail>
      </v-row>

    <!-- Este componente se podría modularizar como se ha hecho en UsersTable -->
    </template>
      <v-container fluid class="title">
        <v-row justify="center">
          Lista de usuarios
        </v-row>
        <v-row justify="center">
          <v-subheader>Usuarios registrados en el sistema</v-subheader>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <br>

    <v-toolbar color="primary" dark>
      <v-toolbar-title v-if="!search">Usuarios registrados</v-toolbar-title>
      <v-spacer v-if="!search"></v-spacer>
      <v-btn v-if="!search" icon @click="search = true">
        <i class="fa fa-search" aria-hidden="true"></i>
      </v-btn>
      <v-btn v-if="!search" icon @click="addUser()">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </v-btn>

      <!-- Campo de búsqueda -->
      <v-text-field
        v-if="search"
        v-on:keyup.esc="searchKey = ''; search = false;"
        v-model="searchKey"
        placeholder="Filtrar usuarios"
        prepend-icon="fa fa-search"
        :autofocus="true"
        :dense="true"
        @focusout="handleFocusOut"
        @keydown.enter.prevent="submitSearch"
      ></v-text-field>

      <v-btn v-if="search" icon @click="searchKey = ''; search = false; setUsersList()">
        <i class="fa fa-window-close" aria-hidden="true"></i>
      </v-btn>

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
            @click:row="openUser($event)"
    >

    <!-- <template  v-slot:item.action="{ item }">
      
      <v-icon
              large
              @click="openUser(item)"
              class="fa fa-eye " aria-hidden="true"
      >
      </v-icon>
    </template>
    <template  v-slot:item.modify="{ item }">
      <v-icon
              large
              @click="deleteUserConfirmation(item)"
              class="fa fa-trash " aria-hidden="true"
      >
      </v-icon>
    </template> -->
  </v-data-table>
  </div>
</template>

<script>
import DialogBox from '../components/DialogBox'
import UserDetail from '../components/UserDetail';
var axios = require('axios');

  export default {
    name: 'UsersList',
    
    components: {
      DialogBox,
      UserDetail,
    },
    created() {
      this.setUsersList();
    },
    data: () => ({
      search: false,
      searchKey: "",

      newUser: {
        nombre: null,
        telefono: null,
        correo: null,
        fechaNacimiento: null,
      },

      headers: [
        { text: 'Nombre', value: 'nombre', sortable: true},
        { text: 'Correo', value: 'correo', sortable: false, align: 'center'},
        { text: 'Telefono', value: 'telefono', sortable: false, align: 'center'},
        { text: 'Fecha nacimiento', value: 'fechaNacimiento', sortable: true, align: 'center'},
        // { text: 'Detalle', value: 'action', sortable: false },
        // { text: 'Borrar', value: 'modify', sortable: false },
      ],
      loadingUserList: true,

      userDetailsDialog: false,
      selection: null,
      newUserFlag: false,
      selectedUser: null,

      toggleUsersManageCard: true,

    }),
    methods: {
      /**
       * Realiza una petición de busqueda.
       */
      async submitSearch() {
        this.loadingUserList = true;
        await this.$store.dispatch("searchUser", this.searchKey);
        this.loadingUserList = false;
      },
      /**
       * Focus out en la barra de búsqueda.
       */
      handleFocusOut() {
      },
      /**
       * Abre el detalle de un usuario.
       * @param {User} user
       */
      openUser(user) {
        this.selectedUser = {...user}
        this.newUserFlag = false;
        this.userDetailsDialog = !this.userDetailsDialog;
      },
      /**
       * Abre el diálogo de nuevo usuario.
       */
      addUser() {
        this.newUserFlag = true;
        this.userDetailsDialog = !this.userDetailsDialog;
      },
      /**
       * Descarga e instancia la lista de usuarios.
       */
      async setUsersList() {
        // Para evitar acoplamiento en la vista
        await this.$store.dispatch('getUsers');
        this.loadingUserList = false;
      },
     
      /**
       * Shows the dialog.
       * @param {boolean} show
       */
      updateDialogShow(show) {
        this.userDetailsDialog = show;
      },

    }
  }
</script>

<style>
.title {
  margin-top: 1em;
}
.view-container {
  margin: 2em;
}
</style>