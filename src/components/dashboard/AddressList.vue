<template>
  <div>
    <a href="#" class="button is-success is-fullwidth is-medium mb-1">Lägg till en ny mottagare</a>
    <AddressEntry v-for="address in addresses" :data.sync="address" :key="address._id"></AddressEntry>
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

    this.$on('ADDRESS_REMOVED', id => {
      this.addresses = this.addresses.filter(function(obj) {
        return obj._id != id;
      });
    });
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
