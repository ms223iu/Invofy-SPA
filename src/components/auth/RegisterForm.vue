<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <p :class="{ 'control': true }">
        <input v-model="form.email" v-validate="'email|required'" :class="{'input is-medium': true, 'is-danger': errors.has('email')}" ref="email" name="email" type="email" placeholder="email" :disabled="isLoading">
        <span v-show="errors.has('email')" class="help is-danger has-text-2">{{ errors.first('email') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.password" v-validate="'min:8|required'" :class="{'input is-medium': true, 'is-danger': errors.has('lösenord')}" name="lösenord" type="password" placeholder="lösenord" :disabled="isLoading">
        <span v-show="errors.has('lösenord')" class="help is-danger">{{ errors.first('lösenord') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Repetera lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.confirmedPassword" v-validate="'min:8|required|confirmed:lösenord'" :class="{'input is-medium': true, 'is-danger': errors.has('repetera-lösenord')}" name="repetera-lösenord" type="password" placeholder="repetera lösenord" @keyup.enter="register()" :disabled="isLoading">
        <span v-show="errors.has('repetera-lösenord')" class="help is-danger">{{ errors.first('repetera-lösenord') }}</span>
      </p>
    </div>

    <a href="#" :class="[ isLoading ? 'is-loading' : '', 'button is-info mt-2 is-centered is-medium is-active is-outlined']" @click="register()">Registrera</a>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';

export default {
  mixins: [Toast],
  data() {
    return {
      isLoading: false,
      form: {
        email: '',
        password: '',
        confirmedPassword: ''
      }
    };
  },

  mounted() {
    setTimeout(() => {
      this.$refs.email.focus();
    }, 200);
  },

  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (!result) return;

        this.apiRegister();
      });
    },

    apiRegister() {
      this.isLoading = true;

      axios
        .post('api/user', {
          email: this.form.email,
          password: this.form.password
        })
        .then(response => {
          this.showSuccessToast(
            'Ditt konto har blivit skapad. Du kan nu logga in! :)'
          );
        })
        .catch(err => {
          const status = err.response.status;

          if (status == 409) {
            this.showErrorToast(
              'Det finns redan ett konto som är kopplad till detta mejlet'
            );
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.form.email = '';
          this.form.password = '';
          this.form.confirmedPassword = '';
          this.$refs.email.focus();
        })
        .then(() => {
          this.$refs.email.focus();
          this.errors.clear();
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
