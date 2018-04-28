<template>
  <div class="has-text-centered">
    <table class="table is-fullwidth is-stripped is-bordered">
      <tr>
        <th>#</th>
        <th>Mottagare</th>
        <th>Skapades</th>
        <th>Hantera</th>
      </tr>
      <tr v-for="(invoice, index) in invoices" :key="index">
        <td>{{ invoice.number }}</td>
        <td>{{ invoice.customer.displayName }}</td>
        <td>{{ invoice.date | date }}</td>
        <td>
          <button class="button is-danger" @click="remove(invoice._id)">Ta Bort</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';

export default {
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
  },

  filters: {
    date(value) {
      if (!value) return '';
      let date = new Date(value);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;

      return day + '-' + month + '-' + year;
    }
  }
};
</script>

<style scoped>

</style>
