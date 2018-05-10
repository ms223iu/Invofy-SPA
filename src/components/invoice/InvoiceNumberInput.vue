<template>
  <div class="field">
    <label class="label">Faktura Nr*</label>
    <p class="control">
      <input v-model="number" v-validate="'required|numeric|min_value:1'" @input="numberChanged()" :class="{'input is-medium has-text-centered': true, 'is-danger': errors.has('nummer')}" name="nummer" type="number" placeholder="#" autocomplete="off" autocorrect="off" spellcheck="false" :disabled="loading">
    </p>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['loading'],

  data() {
    return {
      number: ''
    };
  },

  methods: {
    numberChanged() {
      this.$emit('changed', this.number);
    }
  }
};
</script>

<style scoped>
.label {
  color: #4a4a4a;
}
</style>
