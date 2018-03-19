<template>
  <div class="is-loading">
    <b-collapse class="card" v-for="address in addresses" :key="address._id" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title" >{{ address.name }}</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
            </div>
            <div class="card-content">
                <div class="content has-text-centered" style="white-space: pre-line">{{ address.address }}</div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item has-text-info has-text-weight-semibold" @click="editAddress(address)">Ändra</a>
                <a class="card-footer-item has-text-danger has-text-weight-semibold" @click="removeAddress(address)">Ta bort</a>
            </footer>
        </b-collapse>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
export default {
  mixins: [Toast],
  data() {
    return {
      addresses: null,
      currentAddress: null
    };
  },

  created() {
    this.apiGetAddresses();
  },

  computed: {
    hasNoAddresses() {
      return this.addresses && this.addresses.length <= 0;
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
          console.log('Catch from list: ' + error);
        });
    },

    editAddress(address) {},

    removeAddress(address) {
      //this.addresses.splice(this.addresses.indexOf(address), 1);
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
