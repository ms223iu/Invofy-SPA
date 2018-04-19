<template>
  <div @keyup.enter="login()">
    <form>
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
          <input v-model="form.password" v-validate="'required'" :class="{'input is-medium': true, 'is-danger': errors.has('lösenord')}" name="lösenord" type="password" placeholder="lösenord" autocomplete="on" :readonly="isLoggingIn">
        </p>
      </div>
    </form>

    <button :class="[ isLoggingIn ? 'is-loading' : '', 'button is-info mt-1 is-centered is-medium is-outlined is-active is-fullwidth mt-2']" @click="login()">Logga in</button>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import { Focus } from '../../mixins/Focus';

export default {
  mixins: [Toast, Focus],
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
        if (!result) {
          this.focusOnValidationError(this.$el);
          return;
        }

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
          this.form.email = '';
          this.form.password = '';
          this.$validator.reset();

          if (status == 401) {
            this.showErrorToast(
              'Ditt konto är inte aktiv eller har blivit spärrad. Kontakta supporten',
              4000
            );
          } else if (status == 403) {
            this.showErrorToast('Felaktigt lösenord');
          } else if (status == 404) {
            this.showErrorToast('Ingen konto är kopplad till detta mejlet');
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
        })
        .finally(() => {
          this.isLoggingIn = false;
        });
    }
  }
};
</script>

<style >

</style>

