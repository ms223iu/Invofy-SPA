<template>
  <div>
    <SectionInfo>Nedan kan du visa och redigera dina mottagare.</SectionInfo>
    <AddressEntry v-for="address in addresses" :data="address" :key="address._id" @addressRemoved="addressRemoved"></AddressEntry>
  </div>
</template>

<script>
import SectionInfo from '../../components/dashboard/SectionInfo';
import AddressEntry from '../../components/address/Entry';
import { Toast } from '../../mixins/Toast';

export default {
  components: { SectionInfo, AddressEntry },
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
    addressRemoved(id) {
      this.addresses = this.addresses.filter(function(obj) {
        return obj._id != id;
      });
    },

    apiGetAddresses() {
      axios
        .get('api/address')
        .then(response => {
          this.addresses = response.data;
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
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
