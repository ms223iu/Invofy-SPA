<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Lägg till en ny mottagare</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Visningsnamn</label>
          <p :class="{ 'control': true }">
            <input v-model="address.displayName" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('visningsnamn')}" name="visningsnamn" type="text" placeholder="visningsnamn" :disabled="isLoading">
            <span v-show="errors.has('visningsnamn')" class="help is-danger">{{ errors.first('visningsnamn') }}</span>
          </p>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Namn</label>
              <p :class="{ 'control': true }">
                <input v-model="address.customer" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('namn')}" name="namn" type="text" placeholder="namn" :disabled="isLoading">
                <span v-show="errors.has('namn')" class="help is-danger">{{ errors.first('namn') }}</span>
              </p>
            </div>

            <div class="field">
              <label class="label">Adressrad 1</label>
              <p :class="{ 'control': true }">
                <input v-model="address.addr1" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('adressrad1')}" name="adressrad1" type="text" placeholder="adressrad 1" :disabled="isLoading">
                <span v-show="errors.has('adressrad1')" class="help is-danger">{{ errors.first('adressrad1') }}</span>
              </p>
            </div>

            <div class="field">
              <label class="label">Adressrad 2</label>
              <p :class="{ 'control': true }">
                <input v-model="address.addr2" :class="{'input': true, 'is-danger': errors.has('adressrad2')}" name="adressrad2" type="text" placeholder="adressrad 2" :disabled="isLoading">
                <span v-show="errors.has('adressrad2')" class="help is-danger">{{ errors.first('adressrad2') }}</span>
              </p>
            </div>

            <div class="field">
              <label class="label">Postnummer</label>
              <p :class="{ 'control': true }">
                <input v-model="address.post" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('postnummer')}" name="postnummer" type="text" placeholder="postnummer" :disabled="isLoading">
                <span v-show="errors.has('postnummer')" class="help is-danger">{{ errors.first('postnummer') }}</span>
              </p>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Stad</label>
              <p :class="{ 'control': true }">
                <input v-model="address.city" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('stad')}" name="stad" type="text" placeholder="stad" :disabled="isLoading">
                <span v-show="errors.has('stad')" class="help is-danger">{{ errors.first('stad') }}</span>
              </p>
            </div>

            <div class="field">
              <label class="label">Land</label>
              <p :class="{ 'control': true }">
                <input v-model="address.country" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('land')}" name="land" type="text" placeholder="land" :disabled="isLoading">
                <span v-show="errors.has('land')" class="help is-danger">{{ errors.first('land') }}</span>
              </p>
            </div>
            <div class="field">
              <label class="label">Referensrad 1</label>
              <p :class="{ 'control': true }">
                <input v-model="address.ref1" :class="{'input': true, 'is-danger': errors.has('referensrad1')}" name="referensrad1" type="text" placeholder="referensrad 1" :disabled="isLoading">
                <span v-show="errors.has('referensrad1')" class="help is-danger">{{ errors.first('referensrad1') }}</span>
              </p>
            </div>
            <div class="field">
              <label class="label">Referensrad 2</label>
              <p :class="{ 'control': true }">
                <input v-model="address.ref2" :class="{'input': true, 'is-danger': errors.has('referensrad2')}" name="referensrad2" type="text" placeholder="referensrad 2" :disabled="isLoading">
                <span v-show="errors.has('referensrad2')" class="help is-danger">{{ errors.first('referensrad2') }}</span>
              </p>
            </div>
          </div>
        </div>
        <button class="button is-info is-medium" @click="closeModal()">Avbryt</button>
        <button class="button is-success is-medium" @click="save()">Spara mottagare</button>
      </section>

    </div>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';

export default {
  mixins: [Toast],
  data() {
    return {
      isLoading: false,
      address: {}
    };
  },

  methods: {
    closeModal() {
      this.$parent.$emit('ADDRESS_MODAL_CLOSE');
    },

    save() {
      this.$validator.validateAll().then(result => {
        if (!result) return;
        this.isLoading = true;
        this.apiCreateAddress();
      });
    },

    apiCreateAddress() {
      axios
        .post('api/address', this.address)
        .then(response => {
          this.$parent.$emit('ADDRESS_MODAL_SAVE', response.data);
          this.showSuccessToast('Adress skapades');
        })
        .catch(err => {
          const status = err.response.status;

          if (status == 409) {
            this.showErrorToast('Det finns redan en adress med detta namnet');
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
.label {
  color: black;
}
</style>
