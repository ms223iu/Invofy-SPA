<template>
  <div @keyup.enter="validateForm()">
    <div class="field displayname">
      <label class="label">Visningsnamn*</label>
      <p :class="{ 'control': true }">
        <input v-model="address.displayName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('visningsnamn')}" name="visningsnamn" type="text" placeholder="visningsnamn" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
      </p>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Namn*</label>
          <p :class="{ 'control': true }">
            <input v-model="address.customer" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('namn')}" name="namn" type="text" placeholder="namn" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>

        <div class="field">
          <label class="label">Adressrad 1*</label>
          <p :class="{ 'control': true }">
            <input v-model="address.addr1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('adressrad1')}" name="adressrad1" type="text" placeholder="adressrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>

        <div class="field">
          <label class="label">Adressrad 2</label>
          <p :class="{ 'control': true }">
            <input v-model="address.addr2" :class="{'input': true, 'is-danger': errors.has('adressrad2')}" name="adressrad2" type="text" placeholder="adressrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>

        <div class="field">
          <label class="label">Postnummer*</label>
          <p :class="{ 'control': true }">
            <input v-model="address.post" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('postnummer')}" name="postnummer" type="text" placeholder="postnummer" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Stad*</label>
          <p :class="{ 'control': true }">
            <input v-model="address.city" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('stad')}" name="stad" type="text" placeholder="stad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>

        <div class="field">
          <label class="label">Land*</label>
          <p :class="{ 'control': true }">
            <input v-model="address.country" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('land')}" name="land" type="text" placeholder="land" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>
        <div class="field">
          <label class="label">Referensrad 1</label>
          <p :class="{ 'control': true }">
            <input v-model="address.ref1" :class="{'input': true, 'is-danger': errors.has('referensrad1')}" name="referensrad1" type="text" placeholder="referensrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>
        <div class="field">
          <label class="label">Referensrad 2</label>
          <p :class="{ 'control': true }">
            <input v-model="address.ref2" :class="{'input': true, 'is-danger': errors.has('referensrad2')}" name="referensrad2" type="text" placeholder="referensrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="isLoading">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Focus } from '../../mixins/Focus';

export default {
  props: ['isLoading', 'data'],
  mixins: [Focus],
  data() {
    return {
      address: this.data || {}
    };
  },

  created() {
    EventBus.$on('ADDRESS_INPUT_VALIDATE', () => {
      this.validateForm();
    });

    EventBus.$on('ADDRESS_INPUT_CLEAR', () => {
      this.clearInput();
    });
  },

  methods: {
    validateForm() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.focusOnValidationError(this.$el);
          return;
        }

        this.$emit('response', this.address);
      });
    },

    clearInput() {
      this.address = {};
      this.errors.clear();
    }
  }
};
</script>

<style scoped>
.label {
  color: #4a4a4a;
}

.column {
  padding-top: 0;
}

.displayname {
  margin-bottom: 1.5rem;
  margin-top: -0.8rem;
}
</style>
