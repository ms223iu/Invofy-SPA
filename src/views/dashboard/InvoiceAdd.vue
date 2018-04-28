<template>
  <div @keyup.enter="save()">
    <div class="columns">
      <div class="column">
        <InvoiceNumberInput @changed="numberChanged" :loading="isLoading"></InvoiceNumberInput>
      </div>
      <div class="column is-10">
        <AddressSelector @changed="customerChanged" :loading="isLoading"></AddressSelector>
      </div>
    </div>

    <div v-if="customerIsEmpty" class="columns">
      <div class="column">
      </div>
      <div class="column">
        <AddressPreview :address="data.customer"></AddressPreview>
      </div>
    </div>

    <InputTable @items="itemsChanged" :loading="isLoading"></InputTable>
    <button type="button" :class="{'is-loading': isLoading, 'button is-medium is-success is-fullwidth': true}" @click="save()">Spara Faktura</button>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import { ObjectUtil } from '../../mixins/ObjectUtil';
import InvoiceNumberInput from '../../components/invoice/InvoiceNumberInput';
import AddressSelector from '../../components/invoice/AddressSelector';
import AddressPreview from '../../components/address/Preview';
import InputTable from '../../components/invoice/InputTable';

export default {
  components: {
    InvoiceNumberInput,
    AddressSelector,
    AddressPreview,
    InputTable
  },
  mixins: [Toast, ObjectUtil],
  data() {
    return {
      isLoading: false,
      data: {
        number: '',
        customer: {},
        items: []
      }
    };
  },

  methods: {
    numberChanged(number) {
      this.data.number = number;
    },

    customerChanged(customer) {
      this.data.customer = customer;
    },

    itemsChanged(items) {
      this.data.items = items;
    },

    save() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.isLoading = true;
          // Remove last table row (should be empty unless validation fails)
          this.data.items.splice(this.data.items.length - 1, 1);
          this.apiCreateInvoice();
        }
      });
    },

    apiCreateInvoice() {
      axios
        .post('api/invoice', this.data)
        .then(response => {
          this.showSuccessToast('Fakturan skapades');
          this.$router.push('/dashboard/invoice');
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    customerIsEmpty() {
      return !this.isEmpty(this.data.customer);
    }
  }
};
</script>

<style scoped>

</style>
