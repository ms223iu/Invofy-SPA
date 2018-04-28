<template>
  <div class="has-text-centered">
    <InvoiceTable :data="invoices" @remove="remove"></InvoiceTable>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import InvoiceTable from '../../components/invoice/InvoiceTable';

export default {
  components: { InvoiceTable },
  mixins: [Toast],
  data() {
    return {
      isLoading: false,
      invoices: {}
    };
  },

  created() {
    this.apiGetInvoices();
  },

  methods: {
    remove(id) {
      console.log(id);
      //this.apiDeleteInvoice(id);
    },

    invoiceRemoved(id) {
      this.invoices = this.invoices.filter(function(obj) {
        return obj._id != id;
      });
    },

    apiGetInvoices() {
      axios
        .get('api/invoice')
        .then(response => {
          this.invoices = response.data;
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        });
    },

    apiDeleteInvoice(id) {
      axios
        .delete('api/invoice/' + id)
        .then(response => {
          this.invoiceRemoved(id);
          this.showSuccessToast('Fakturan borttagen');
        })
        .catch(err => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        })
        .finally(() => {});
    }
  }
};
</script>

<style scoped>

</style>
