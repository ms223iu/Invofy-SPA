<template>
  <table v-if="!isEmpty(data)" class="table is-fullwidth is-stripped is-bordered">
    <tr>
      <th>#</th>
      <th>Mottagare</th>
      <th class="has-text-centered">Skapades</th>
      <th class="has-text-centered">Hantera</th>
    </tr>
    <tr v-for="(invoice, index) in data" :key="index">
      <td>{{ invoice.number }}</td>
      <td>{{ invoice.customer.displayName }}</td>
      <td class="has-text-centered">{{ invoice.date | date }}</td>
      <td class="has-text-centered">
        <Button type="danger" :safe="true" @onClick="remove(invoice._id)" :isLoading="isDownloadingPdf">Ta bort</Button>
        <Button @onClick="pdfDownloadInvoice(invoice._id, invoice.number, invoice.date)" :isLoading="isDownloadingPdf">Hämta</Button>
      </td>
    </tr>
  </table>
</template>

<script>
import { ObjectUtil } from '../../mixins/ObjectUtil';
import Button from '../generic/Button';

export default {
  components: { Button },
  mixins: [ObjectUtil],
  props: {
    data: {
		default: {}
    }
  },

  data() {
    return {
			isDownloadingPdf: false
		};
  },

  methods: {
    pdfDownloadInvoice(id, number, date) {
				this.isDownloadingPdf = true;
				axios.get(`api/invoice/pdf/${id}`, {responseType: 'blob'}).then((response) => {
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `faktura-${number}-${date.split('T')[0]}.pdf`);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}).finally(() => {
					this.isDownloadingPdf = false;
				})
    },
    remove(id) {
      this.$emit('remove', id);
    }
  },

  filters: {
    date(value) {
      if (!value) return '';
      let date = new Date(value);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();

      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
      if (hour < 10) hour = '0' + hour;
      if (minutes < 10) minutes = '0' + minutes;

      return day + '-' + month + '-' + year + ' ' + hour + ':' + minutes;
    }
  }
};
</script>

<style scoped>
th:nth-child(1) {
  width: 50px;
}

th:nth-child(3) {
  width: 180px;
}

th:nth-child(4) {
  width: 200px;
}

td {
  vertical-align: middle;
}
</style>
