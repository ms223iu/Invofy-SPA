<template>
  <div>
    <div class="field">
      <label class="label">Visningsnamn</label>
      <p :class="{ 'control': true }">
        <input v-model="address.displayName" v-validate="'required'" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('visningsnamn')}" name="visningsnamn" type="text" placeholder="visningsnamn" :disabled="isLoading">
        <span v-show="errors.has('visningsnamn')" class="help is-danger">{{ errors.first('visningsnamn') }}</span>
      </p>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Namn</label>
          <p :class="{ 'control': true }">
            <input v-model="address.customer" v-validate="'required'" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('namn')}" name="namn" type="text" placeholder="namn" :disabled="isLoading">
            <span v-show="errors.has('namn')" class="help is-danger">{{ errors.first('namn') }}</span>
          </p>
        </div>

        <div class="field">
          <label class="label">Adressrad 1</label>
          <p :class="{ 'control': true }">
            <input v-model="address.addr1" v-validate="'required'" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('adressrad1')}" name="adressrad1" type="text" placeholder="adressrad 1" :disabled="isLoading">
            <span v-show="errors.has('adressrad1')" class="help is-danger">{{ errors.first('adressrad1') }}</span>
          </p>
        </div>

        <div class="field">
          <label class="label">Adressrad 2</label>
          <p :class="{ 'control': true }">
            <input v-model="address.addr2" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('adressrad2')}" name="adressrad2" type="text" placeholder="adressrad 2" :disabled="isLoading">
            <span v-show="errors.has('adressrad2')" class="help is-danger">{{ errors.first('adressrad2') }}</span>
          </p>
        </div>

        <div class="field">
          <label class="label">Postnummer</label>
          <p :class="{ 'control': true }">
            <input v-model="address.post" @input="inputChanged()" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('postnummer')}" name="postnummer" type="text" placeholder="postnummer" :disabled="isLoading">
            <span v-show="errors.has('postnummer')" class="help is-danger">{{ errors.first('postnummer') }}</span>
          </p>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Stad</label>
          <p :class="{ 'control': true }">
            <input v-model="address.city" @input="inputChanged()" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('stad')}" name="stad" type="text" placeholder="stad" :disabled="isLoading">
            <span v-show="errors.has('stad')" class="help is-danger">{{ errors.first('stad') }}</span>
          </p>
        </div>

        <div class="field">
          <label class="label">Land</label>
          <p :class="{ 'control': true }">
            <input v-model="address.country" @input="inputChanged()" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('land')}" name="land" type="text" placeholder="land" :disabled="isLoading">
            <span v-show="errors.has('land')" class="help is-danger">{{ errors.first('land') }}</span>
          </p>
        </div>
        <div class="field">
          <label class="label">Referensrad 1</label>
          <p :class="{ 'control': true }">
            <input v-model="address.ref1" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('referensrad1')}" name="referensrad1" type="text" placeholder="referensrad 1" :disabled="isLoading">
            <span v-show="errors.has('referensrad1')" class="help is-danger">{{ errors.first('referensrad1') }}</span>
          </p>
        </div>
        <div class="field">
          <label class="label">Referensrad 2</label>
          <p :class="{ 'control': true }">
            <input v-model="address.ref2" @input="inputChanged()" :class="{'input': true, 'is-danger': errors.has('referensrad2')}" name="referensrad2" type="text" placeholder="referensrad 2" :disabled="isLoading">
            <span v-show="errors.has('referensrad2')" class="help is-danger">{{ errors.first('referensrad2') }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';

export default {
  props: ['isLoading'],

  data() {
    return {
      address: {}
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
        console.log('validated');
        if (!result) return;

        this.$emit('response', this.address);
      });
    },

    clearInput() {
      this.address = {};
      this.errors.clear();
    },

    inputChanged() {
      this.$emit('addressChanged', this.address);
    }
  }
};
</script>

<style scoped>
.label {
  color: #4a4a4a;
}
</style>
