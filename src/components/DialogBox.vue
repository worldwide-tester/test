<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card :loading="loading">
      <v-card-title class="headline">
        <i v-if="type == 'warning'" class="fa fa-exclamation-triangle color-warn" aria-hidden="true"></i>
        <i v-if="type == 'info'" class="fa fa-info-circle color-info" aria-hidden="true"></i>
        <i v-if="type == 'error'" class="fa fa-times color-danger" aria-hidden="true"></i>
        <i v-if="type == 'question'" class="fa fa-question-circle color-question" aria-hidden="true"></i>
        <v-card-title>{{ heading }}</v-card-title>
      </v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="hasDismissButton && !loading" text @click="dismiss()">Cancel</v-btn>
        <v-btn v-else-if="loading" text>Cancel</v-btn>
        <v-btn v-if="!loading" text @click="confirm()">Acept</v-btn>
        <v-btn v-else text>Acept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
* Diálogo simple con un mensaje y posibilidad de aceptar o cancelar.
*/
export default {
  data: function () {
    return {
      dialog : false,
      loading : false,
      hasDismissButton : true,
      type: '',
      heading : '',
      title : '',
      text : '',
      onConfirm : () => { return new Promise(resolve => { resolve(); })},
      onDismiss : () => { return new Promise(resolve => { resolve(); })},
    }
  },
  watch: {
    type : function(type){
      switch (type) {
        case 'info':
          this.heading = 'Información'
          break;
        case 'warning':
          this.heading = 'Atención'
          break;
        case 'error':
          this.heading = 'Error';
          break;
        case 'question':
          this.heading = 'Confirmación'
          break;
        default:
          this.heading = '';
          break;
      }
    }
  },
  methods : {
    /**
    * Shows the dialog box
    * @param {function} onConfirm
    * @param {function} onDismiss
    * @public
    */
    show( type,
          message,
          hasDismissButton,
          onConfirm = () => { return new Promise(resolve => { resolve(); })},
          onDismiss = () => { return new Promise(resolve => { resolve(); })},
        ) {
      this.type = type;
      this.text = message;
      this.hasDismissButton = hasDismissButton;
      this.onConfirm = onConfirm;
      this.onDismiss = onDismiss;
      this.dialog = true;
    },

    /**
    * Resuelve mediante la función onConfirm y cierra el diálogo
    * @public
    */
    async confirm() {
      this.loading = true;
      await this.onConfirm();
      this.loading = false;
      this.dialog = false;
    },

    /**
    * Resuelve mediante la función dismiss y cierra el diálogo
    * @public
    */
    async dismiss() {
      this.loading = true;
      await this.onDismiss();
      this.loading = false;
      this.dialog = false;
    },

    /**
    * Closes the dialog
    * @public
    */
    close() {
      this.dialog = false;
    }
  }
}
</script>
