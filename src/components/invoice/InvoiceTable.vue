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
        <button class="button is-danger" @click="remove(invoice._id)">Ta Bort</button>
        <a :href="'/api/invoice/pdf/' + invoice._id" class="button is-success">Hämta</a>
      </td>
    </tr>
  </table>
</template>

<script>
import { ObjectUtil } from '../../mixins/ObjectUtil';
export default {
  mixins: [ObjectUtil],
  props: {
    data: {
      default: {}
    }
  },

  data() {
    return {};
  },

  methods: {
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
  width: 160px;
}

th:nth-child(4) {
  width: 180px;
}

td {
  vertical-align: middle;
}
</style>
