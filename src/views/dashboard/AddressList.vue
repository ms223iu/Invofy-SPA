<template>
  <div>
    <SectionInfo>Nedan kan du visa och redigera dina mottagare.</SectionInfo>
    <AddressEntry v-for="address in addresses" :data="address" :key="address._id" @addressRemoved="addressRemoved"></AddressEntry>
    <p v-if="hasNoAddresses" class="has-text-centered is-size-5">Du har inga tillagda mottagare.</p>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import { ObjectUtil } from '../../mixins/ObjectUtil';
import SectionInfo from '../../components/dashboard/SectionInfo';
import AddressEntry from '../../components/address/Entry';

export default {
  components: { SectionInfo, AddressEntry },
  mixins: [Toast, ObjectUtil],
  data() {
    return {
      addresses: {}
    };
  },

  created() {
    this.apiGetAddresses();
  },

  computed: {
    hasNoAddresses() {
      return this.isEmpty(this.addresses);
    }
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
