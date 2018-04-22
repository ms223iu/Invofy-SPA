<template>
  <div class="field">
    <label class="label">Faktura Nr*</label>
    <p class="control">
      <input v-model="number" v-validate="'required|numeric'" @input="numberChanged()" :class="{'input is-medium has-text-centered': true, 'is-danger': errors.has('nummer')}" name="nummer" min="1" type="number" placeholder="#" autocomplete="off" autocorrect="off" spellcheck="false">
    </p>
  </div>
</template>

<script>
export default {
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
