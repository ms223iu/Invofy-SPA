<template>
  <p class="has-text-centered">Invoice List...</p>
  <!--<div class="has-text-centered">
    <table class="table is-fullwidth is-stripped">
      <tr>
        <th></th>
      </tr>
    </table>
  </div>-->
</template>

<script>
import { Toast } from '../../mixins/Toast';

export default {
  mixins: [Toast],
  data() {
    return {
      invoices: {}
    };
  },

  created() {
    //this.apiGetInvoices();
  },

  methods: {
    apiGetInvoices() {
      axios
        .get('api/invoice')
        .then(response => {
          this.invoices = response.data;
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        });
    }
  }
};
</script>

<style scoped>

</style>
