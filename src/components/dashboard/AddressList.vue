<template>
  <div>
    <AddressEntry v-for="(address, index) in addresses" :data="address" :key="index"></AddressEntry>
  </div>
</template>

<script>
import AddressEntry from '../address/AddressEntry';
import { Toast } from '../../mixins/Toast';

export default {
  components: { AddressEntry },
  mixins: [Toast],
  data() {
    return {
      addresses: null
    };
  },

  created() {
    this.apiGetAddresses();
  },

  methods: {
    apiGetAddresses() {
      axios
        .get('api/address')
        .then(response => {
          this.addresses = response.data;
        })
        .catch(error => {
          console.log('Catch from list: ' + error);
        });
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
