<template>
  <div>
    <div class="columns">
      <div class="column">
        <InvoiceNumberInput @changed="numberChanged"></InvoiceNumberInput>
      </div>
      <div class="column is-10">
        <AddressSelector @changed="customerChanged"></AddressSelector>
      </div>
    </div>
    <InputTable></InputTable>
  </div>
</template>

<script>
import InvoiceNumberInput from '../../components/invoice/InvoiceNumberInput';
import AddressSelector from '../../components/invoice/AddressSelector';
import InputTable from '../../components/invoice/InputTable';

export default {
  components: { InvoiceNumberInput, AddressSelector, InputTable },
  data() {
    return {
      data: {
        number: null,
        customer: {}
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

    apiCreateInvoice() {}
  }
};
</script>

<style>

</style>
