<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <DialogBox ref="resultDialog"></DialogBox>
    <DialogBox ref="confirmationDialog"></DialogBox>

    <!-- cuerpo del dialogo -->
    <v-card>

      <!-- Toolbar titulo -->
      <v-toolbar dark color="primary">
        <!-- Cerrar -->
        <v-btn icon dark @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-if="!newUser">Usuario</v-toolbar-title>
        <v-toolbar-title v-if="newUser">Nuevo usuario</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- Botón edición -->
        <v-toolbar-items>
        <v-btn class="edit-button" v-if="!editionMode && !newUser" dark text @click="startEditMode()">
          Editar
          <v-icon class="edit-icon">far fa-edit</v-icon>
        </v-btn>
        <v-btn class="edit-button" v-if="editionMode && !newUser" dark text @click="cancelModifications()">
          Cancelar
        </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- contenido -->
      <v-card class="main-card" v-if="selectedElement || newUser">
        <!-- Titulo descriptivo -->
        <v-container fluid class="title">
          <div>
            <v-row justify="center">
              <v-subheader v-if="!newUser">Detalle de usuario</v-subheader>
              <v-subheader v-if="newUser">Añadir un usuario</v-subheader>
            </v-row>
          </div>
        </v-container>
        <v-divider></v-divider>

          <!-- Titulo del User -->
          <v-card-title v-if="!newUser" >
            <span class="headline">{{ selectedElement.name }}</span>
            <v-spacer></v-spacer>
          </v-card-title>

          <!-- Campos de un producto
            Si se esta en modo lectura: se muestran los campos
            Si se esta en modo edicion o nuevo producto: se permite edición de campos
          -->
          <v-card-subtitle v-if="!newUser && !editionMode" style="margin-top: 8px">
            <v-text-field 
              type="string" 
              label="Nombre de usuario"
              prepend-icon="mdi-account"
              v-model="selectedElement.nombre" 
              placeholder="Nombre de usuario"
              outlined
              dense
              :readonly="!newUser"
            ></v-text-field>
            <v-text-field 
              type="number" 
              label="Número de teléfono"
              prepend-icon="mdi-phone"
              v-model="selectedElement.telefono" 
              placeholder="Número de teléfono"
              outlined
              dense
              :readonly="!newUser"
            ></v-text-field>
            <v-text-field 
              type="string" 
              prepend-icon="mdi-at"
              label="Correo electrónico"
              v-model="selectedElement.correo" 
              placeholder="Correo electrónico"
                outlined
                dense
              :readonly="!newUser"
            ></v-text-field>
            <v-text-field
              v-model="selectedElement.fechaNacimiento"
              label="Fecha de nacimiento"
              prepend-icon="mdi-calendar"
              outlined
              dense
              readonly
            ></v-text-field>
          </v-card-subtitle>

          <!-- Modo de edición del producto, hace uso del -->

          <v-card-subtitle v-if="newUser || editionMode" style="margin-top: 8px">
            <v-form>
              <v-text-field 
                type="string" 
                label="Nombre de usuario"
                prepend-icon="mdi-account"
                v-model="editedUser.nombre" 
                placeholder="Nombre de usuario"
                outlined
                dense
              ></v-text-field>
              <v-text-field 
                type="number" 
                prepend-icon="mdi-phone"
                label="Número de teléfono"
                v-model="editedUser.telefono" 
                placeholder="Número de teléfono"
                outlined
                dense
              ></v-text-field>
              <v-text-field 
                type="string" 
                prepend-icon="mdi-at"
                label="Correo electrónico"
                v-model="editedUser.correo" 
                placeholder="Correo electrónico"
                outlined
                dense
              ></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="editedUser.fechaNacimiento"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedUser.fechaNacimiento"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedUser.fechaNacimiento"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(editedUser.fechaNacimiento)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>


            </v-form>
          </v-card-subtitle>

          <hr>

          <!-- Acciones de un producto:
            Si se esta en modo lectura: Aceptar
            Si se está modo edicion: cancelar, modificar, eliminar
            Si se está en modo nuevo producto: cancelar, guardar
          -->
          <!-- Modo lectura -->
          <v-card-actions v-if="!newUser && !editionMode">
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog()">Cerrar</v-btn>
          </v-card-actions>

          <!-- Modo edición -->
          <v-card-actions v-if="!newUser && editionMode">
            <v-btn color="red darken-1" rounded outlined @click="deleteUserPetition()">Eliminar usuario</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="updateUserPetition()">Modificar</v-btn>
            <v-btn color="primary" text @click="cancelModifications()">Cancelar</v-btn>
          </v-card-actions>

          <!-- Modo nuevo -->
          <v-card-actions v-if="newUser && !editionMode">
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="createUser()">Guardar</v-btn>
            <v-btn color="primary" text @click="closeDialog()">Cancelar</v-btn>
          </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogBox from './DialogBox';
var axios = require('axios');

/**
* Vista de detalle de un usuario, muestra la información relativa a el y
* facilita el formulario para crear nuevos o editar los existentes.
*/
export default {

    props: {
      selectedElement:  undefined,
      newUser: false,
      dialog: false,
    },

    components: {
        DialogBox,
    },
    created() {
    },
    data: () => ({
        menu: undefined,
        show : false,
        editedUser: {
          nombre: "",
          correo: "",
          telefono: undefined,
          fechaNacimiento: "",
        },
        userSkel: {
          nombre: "",
          correo: "",
          telefono: undefined,
          fechaNacimiento: "",
        },
        editionMode: false,
    }),

    watch: {
        dialog: function(dialog) {
            this.show = dialog;
        },
        show: function(show) {
          this.$emit('updateDialogShow', show);
        }
    },

    methods : {

        /**
         * Cancela las modificaciones realizadas y abandona el modo edición
         * @public
         */
        cancelModifications() {
          this.editedUser = {...this.userSkel};
          this.selectedElement = {...this.userSkel};
          this.editionMode = false;
        },

        /**
         * Inicia el modo edición
         * @public
  			 */
        startEditMode() {
          this.editedUser = {...this.selectedElement};
          this.editionMode = true;
        },

        /**
         * Cierra el diálogo, cancelando modificaciones si las hubiere
         * @public
  			 */
        closeDialog() {
          this.cancelModifications();
          this.show = false;
        },

        /**
         * Inicia una petición de eliminación de usuario
         * @public
  			 */
        deleteUserPetition() {
          this.$refs.confirmationDialog.show('warning',
            `¿Está seguro que desea eliminar el usuario?`,
            true,
            this.deleteUser
          )
        },

        /**
         * Elimina el User seleccionado y cierra el diálogo
         * @public
  			 */
        deleteUser() {
          var rd = this.$refs.resultDialog;
          var cd = this.$refs.confirmationDialog;
          var self = this;
          return new Promise(async (resolve, reject) => {
            try {
              const authToken = {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
              };
              // Este código se podría desacoplar en vuex pero se mantiene aqui para mostrar el diálogo y no hacer todos los cambios que requeriría store
              const response = await axios.default.delete(self.$store.state.endpoint+'/client/delete/'+this.selectedElement.id, authToken);
              if(response.status == 200) {
                  console.log("201", "User deleted properly");
                  cd.dismiss();
                  rd.show('info', 'El usuario se ha eliminado correctamente.', false);
                  self.$store.dispatch("getUsers");
                  self.closeDialog();
              }
              else {
                  console.error(response.status, "Problem deleting user in serverside");
                  cd.dismiss();
                  rd.show('error', 'Problema en el servidor al eliminar el usuario.', false);
                  reject(response);
              }
            } catch(err) {
              console.error("Problem with deleting user petition", err)
              cd.dismiss();
              rd.show('error', 'Ha habido un problema al eliminar el usuario.', false);
              reject(err)
            }
          })
        },

        /**
         * Inicia una petición de actualización de User
         * @public
  			 */
        updateUserPetition() {
          this.$refs.confirmationDialog.show('warning',
            `¿Confirmar cambios?`,
            true,
            this.updateUser
          )
        },

        /**
         * Actualiza el User seleccionado a partir del formulario
         * @public
  			 */
        updateUser() {
          this.$store.dispatch("updateUser", this.editedUser);
          this.closeDialog();
        },

        /**
         * Crea un nuevo User
         * @public
  			 */
        createUser() {
          let validUser = this.checkCorrectFields();

          if (validUser) {
            this.$store.dispatch("addUser", this.editedUser);
            this.closeDialog();
          } else {
            this.$refs.resultDialog.show('warning', 'Debe rellenar todos los campos correctamente.', false);
          }
        },

        /**
         * Comprueba que los datos del form estén correctos
         * @public
  			 */
        checkCorrectFields() {
          console.log(this.editedUser.fechaNacimiento)
          if (this.editedUser.nombre != "" && this.editedUser.correo != ""  && this.editedUser.telefono != undefined  && this.editedUser.fechaNacimiento != "" )
            return true;
          return false;
        }
    }
}
</script>

<style>
.main-card {
  margin: 0.5em;
  margin-top: 1em;
}

.edit-icon {
  margin-left: 0.5em;
}

.edit-button {
  background: var(--color-medium-light);
}

.field-description {
  max-width: 26%;
}

.field-form {
  max-width: 100%;
}
</style>
