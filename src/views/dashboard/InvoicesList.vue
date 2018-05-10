<template>
  <div>
    <SectionInfo>Här kan du hitta alla dina skapade fakturor</SectionInfo>

    <div class="has-text-centered">
      <p v-if="hasNoInvoices" class="has-text-centered is-size-5">Du har inga skapade fakturor</p>
      <InvoiceTable v-else :data="invoices" @remove="remove"></InvoiceTable>
    </div>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import { ObjectUtil } from '../../mixins/ObjectUtil';
import InvoiceTable from '../../components/invoice/InvoiceTable';
import SectionInfo from '../../components/dashboard/SectionInfo';

export default {
  components: { InvoiceTable, SectionInfo },
  mixins: [Toast, ObjectUtil],
  data() {
    return {
      isLoading: false,
      invoices: {}
    };
  },

  created() {
    this.apiGetInvoices();
  },

  computed: {
    hasNoInvoices() {
      return this.isEmpty(this.invoices);
    }
  },

  methods: {
    remove(id) {
      this.apiDeleteInvoice(id);
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
          if (error.response.status !== 404) {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
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
        });
    }
  }
};
</script>

<style scoped>

</style>
