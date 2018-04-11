<template>
  <div @keyup.enter="register()">
    <div class="field">
      <label class="label">Email</label>
      <p :class="{ 'control': true }">
        <input v-model="form.email" v-validate="'email|required'" :class="{'input is-medium': true, 'is-danger': errors.has('email')}" ref="email" name="email" type="email" placeholder="email" :readonly="isLoading">
        <span v-show="errors.has('email')" class="help is-danger has-text-2">{{ errors.first('email') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.password" v-validate="'min:8|required'" :class="{'input is-medium': true, 'is-danger': errors.has('lösenord')}" name="lösenord" type="password" placeholder="lösenord" :readonly="isLoading">
        <span v-show="errors.has('lösenord')" class="help is-danger">{{ errors.first('lösenord') }}</span>
      </p>
    </div>

    <div class="field">
      <label class="label">Bekräfta lösenord</label>
      <p :class="{ 'control': true }">
        <input v-model="form.confirmedPassword" v-validate="'required|confirmed:lösenord'" :class="{'input is-medium': true, 'is-danger': errors.has('repetera-lösenord')}" name="bekräfta-lösenord" type="password" placeholder="lösenord" data-vv-as="bekräfta lösenord" :readonly="isLoading">
        <span v-show="errors.has('bekräfta-lösenord')" class="help is-danger">{{ errors.first('bekräfta-lösenord') }}</span>
      </p>
    </div>

    <button :class="[ isLoading ? 'is-loading' : '', 'button is-info mt-1 is-centered is-medium is-active is-outlined']" @click="register()">Registrera</button>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import { Focus } from '../../mixins/Focus';

export default {
  mixins: [Toast, Focus],
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

  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.focusOnValidationError(this.$el);
          return;
        }

        this.isLoading = true;
        this.apiRegister();
      });
    },

    apiRegister() {
      axios
        .post('api/user', this.form)
        .then(() => {
          this.$emit('register');
        })
        .catch(err => {
          const status = err.response.status;
          this.form.email = '';
          this.form.password = '';
          this.form.confirmedPassword = '';
          this.$validator.reset();
          this.$refs.email.focus();

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
