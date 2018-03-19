<template>
  <div>
    <b-field label="Användarnamn">
      <b-input type="text" size="is-medium" v-model="form.username" ref="username" pattern=".{4,}" :disabled="isLoggingIn" required></b-input>
    </b-field>
  
    <b-field label="Lösenord">
      <b-input type="password" size="is-medium" v-model="form.password" @keyup.native.enter="login()" pattern=".{8,}" :disabled="isLoggingIn" required></b-input>
    </b-field>

    <a :class="[ isLoggingIn ? 'is-loading' : '', 'button is-info mt-2 is-centered is-medium is-active']" @click="login()" :disabled="!isValidInput">Logga in</a>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Toast } from '../../mixins/Toast';

export default {
  mixins: [Toast],
  data() {
    return {
      isLoggingIn: false,
      form: {
        username: '',
        password: ''
      }
    };
  },

  computed: {
    isValidInput() {
      return this.form.username.length > 3 && this.form.password.length > 7;
    }
  },

  methods: {
    login() {
      if (!this.isValidInput) return;
      this.isLoggingIn = true;

      axios
        .post('api/auth', {
          username: this.form.username,
          password: this.form.password
        })
        .then(response => {
          EventBus.$emit('AUTH_LOGIN', response.data.token);
        })
        .catch(err => {
          if (err && err.response && err.response.status == 403) {
            this.showErrorToast('Felaktig användarnamn eller lösenord.');
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare.');
          }
        })
        .finally(() => {
          this.isLoggingIn = false;
          this.form.username = '';
          this.form.password = '';
        });
    }
  }
};
</script>

<style scoped>
.button {
  width: 100%;
}
</style>

