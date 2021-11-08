<template>
  <div class="view-container">
    <v-layout row wrap>
      <!-- arriba izquierda -->
      <v-flex xl6 lg6 md6 sm12>
        <v-card
          class="menu-card"
          @click="$router.push('/about')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div >
              <v-avatar
                size="125"
                tile
              >
                <v-img class="left-rounded" src="../assets/manage-users.png"></v-img>
              </v-avatar>
          </div>
          <div class="info-box">
            <h2>
              Documentación
            </h2>
            <p>
              Documentación de la API/Sistema
            </p>
          </div>
          </div>
        </v-card>

      </v-flex>

          <!-- arriba derecha -->
      <v-flex  xl6 lg6 md6 sm12>
        <v-card
          class="menu-card"
          @click="$router.push('/UsersList')"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div >

              <v-avatar
                size="125"
                tile
              >
                <v-img class="left-rounded" src="../assets/new-client.png"></v-img>
              </v-avatar>
          </div>
          <div class="info-box">
            <h2>
              Lista de usuarios
            </h2>
            <p>
              Usuarios registrados en el sistema
            </p>
          </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <UsersTable class="users-table"></UsersTable>
  </div>
</template>

<script>
import UsersTable from '../components/UsersTable';

  export default {
    name: 'Home',

    components: {
      UsersTable
    },
  }
</script>

<style>
.left-rounded {
  border-radius: 100%;
}

.info-box {
    min-height: 90px;
    width: 50%;
    margin-top: 1em;
}

.menu-card {
  margin-right: 1em;
  margin-top: 1em;
}

.view-container {
  margin: 2em;
}
.users-table {
  margin-top: 2em;
}

</style>