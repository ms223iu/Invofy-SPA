<template>
  <div>
    <!--<a class="button is-success is-fullwidth is-medium mb-1" @click="newAddressActive=!newAddressActive">Lägg till en ny mottagare</a>
    <transition name="fade">
      <AddressNewModal v-if="newAddressActive"></AddressNewModal>
    </transition>-->
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
      addresses: null,
      newAddressActive: false
    };
  },

  created() {
    this.apiGetAddresses();

    this.$on('ADDRESS_MODAL_CLOSE', () => {
      this.newAddressActive = false;
    });

    this.$on('ADDRESS_MODAL_SAVE', address => {
      this.addresses.push(address);
      this.newAddressActive = false;
    });

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
