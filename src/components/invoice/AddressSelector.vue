<template>
  <div class="control">
    <label class="label">Kund / Mottagare*</label>
    <p class="control">
      <div :class="[isLoading ? 'is-loading' : '', 'select is-fullwidth is-medium']">
        <select v-model="selectedAddress" :disabled="isLoading">
          <option value="" selected disabled hidden>Välj en mottagare</option>
          <option v-for="(addr, index) in addresses" :value="addr" :key="index">{{ addr.displayName }} - {{ addr.customer }}</option>
        </select>
      </div>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      selectedAddress: '',
      addresses: {}
    };
  },

  created() {
    this.apiGetAddresses();
  },

  watch: {
    selectedAddress() {
      this.$emit('changed', this.selectedAddress);
    }
  },

  methods: {
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
