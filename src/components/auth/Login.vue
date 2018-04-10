<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <p :class="{ 'control': true }">
        <input v-model="form.email" v-validate="'email|required'" :class="{'input is-medium': true, 'is-danger': errors.has('email')}" ref="email" name="email" type="email" placeholder="email" :readonly="isLoggingIn">
        <span v-show="errors.has('email')" class="help is-danger has-text-2">{{ errors.first('email') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.password" v-validate="'min:8|required'" :class="{'input is-medium': true, 'is-danger': errors.has('lösenord')}" name="lösenord" type="password" placeholder="lösenord" @keyup.enter="login()" :readonly="isLoggingIn">
        <span v-show="errors.has('lösenord')" class="help is-danger">{{ errors.first('lösenord') }}</span>
      </p>
    </div>
    <button :class="[ isLoggingIn ? 'is-loading' : '', 'button is-info mt-1 is-centered is-medium is-outlined is-active']" @click="login()">Logga in</button>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';

export default {
  mixins: [Toast],
  data() {
    return {
      isLoggingIn: false,
      form: {
        email: '',
        password: ''
      }
    };
  },

  methods: {
    login() {
      this.$validator.validateAll().then(result => {
        if (!result) return;

        this.isLoggingIn = true;
        this.apiLogin();
      });
    },

    apiLogin() {
      axios
        .post('api/auth', this.form)
        .then(response => {
          this.$emit('login', response.data.token);
        })
        .catch(err => {
          const status = err.response.status;
          this.$refs.email.focus();

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
          this.$validator.reset();
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

