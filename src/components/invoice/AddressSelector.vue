<template>
  <div class="control">
    <label class="label">Kund / Mottagare*</label>
    <div :class="{'is-loading': isLoading, 'is-danger': errors.has('mottagare'), 'select is-fullwidth is-medium': true}">
      <select v-model="selectedAddress" v-validate="'required|not_in:Välj en mottagare'" name="mottagare" @change="addressChanged()" :disabled="isLoading">
        <option value="" selected disabled hidden>Välj en mottagare</option>
        <option v-for="(addr, index) in addresses" :value="addr" :key="index">{{ addr.displayName }} - {{ addr.customer }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['loading'],
  data() {
    return {
      isLoading: true,
      selectedAddress: '',
      addresses: {}
    };
  },

  watch: {
    loading() {
      this.isLoading = this.loading;
    }
  },

  created() {
    this.apiGetAddresses();
  },

  methods: {
    addressChanged() {
      this.$emit('changed', this.selectedAddress);
    },

    apiGetAddresses() {
      axios
        .get('api/address')
        .then(response => {
          this.addresses = response.data;
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
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
  color: #4a4a4a;
}
</style>
