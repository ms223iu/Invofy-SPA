<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <p :class="{ 'control': true }">
        <input v-model="form.email" v-validate="'email|required'" data-vv-delay="250" :class="{'input is-medium': true, 'is-danger': errors.has('email')}" ref="email" name="email" type="email" placeholder="email" :disabled="isLoggingIn" autofocus>
        <span v-show="errors.has('email')" class="help is-danger has-text-2">{{ errors.first('email') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.password" v-validate="'min:8|required'" :class="{'input is-medium': true, 'is-danger': errors.has('lösenord')}" name="lösenord" type="password" placeholder="lösenord" @keyup.enter="login()" :disabled="isLoggingIn">
        <span v-show="errors.has('lösenord')" class="help is-danger">{{ errors.first('lösenord') }}</span>
      </p>
    </div>
    <a href="#" :class="[ isLoggingIn ? 'is-loading' : '', 'button is-info mt-2 is-centered is-medium is-active is-outlined']" @click="login()">Logga in</a>
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
      loginSuccess: false,
      form: {
        email: '',
        password: ''
      }
    };
  },

  mounted() {
    this.$refs.email.focus();
  },

  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (!result) return;

        this.apiLogin();
      });
    },

    apiLogin() {
      this.isLoggingIn = true;

      axios
        .post('api/auth', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          EventBus.$emit('AUTH_LOGIN', response.data.token);
        })
        .catch(err => {
          const status = err.response.status;

          if (status == 401) {
            this.showErrorToast(
              'Ditt konto är inte aktiv eller har blivit spärrad. Kontakta supporten',
              5000
            );
          } else if (status == 403) {
            this.showErrorToast('Felaktig email eller lösenord');
          } else if (status == 404) {
            this.showErrorToast('Ingen konto är kopplad till detta mejlet');
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
        })
        .finally(() => {
          this.isLoggingIn = false;
          this.form.email = '';
          this.form.password = '';
        })
        .then(() => {
          this.$refs.email.focus();
          this.errors.clear();
        });
    },

    clearInputs() {
      this.form.email = '';
      this.form.password = '';
    }
  }
};
</script>

<style scoped>
.button {
  width: 100%;
}
</style>

