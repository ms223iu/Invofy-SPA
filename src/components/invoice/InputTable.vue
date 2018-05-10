<template>
  <table class="table is-fullwidth is-bordered is-striped">
    <thead>
      <tr>
        <th>Beskrivning</th>
        <th class="has-text-centered is-2">Antal</th>
        <th class="has-text-centered">Pris</th>
        <th class="has-text-right">Summa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index" @input="calculateRows()">
        <template v-if="(row.description || row.amount || row.price) || index == 0">
          <td><input v-model="row.description" v-validate="'required'" :class="{'input is-medium': true, 'is-danger': errors.has('d'+index)}" :name="'d'+index" type="text" :disabled="loading"></td>
          <td><input v-model="row.amount" v-validate="'required|numeric|min_value:1'" :class="{'input has-text-centered is-medium': true, 'is-danger': errors.has('a'+index)}" :name="'a'+index" type="number" :disabled="loading"></td>
          <td><input v-model="row.price" v-validate="'required|numeric|min_value:0'" :class="{'input has-text-centered is-medium': true, 'is-danger': errors.has('p'+index)}" :name="'p'+index" type="number" :disabled="loading"></td>
        </template>

        <template v-else>
          <td><input v-model="row.description" class="input is-medium" type="text" :disabled="loading"></td>
          <td><input v-model="row.amount" v-validate="'numeric|min_value:1' " :class="{'input has-text-centered is-medium': true, 'is-danger': errors.has('a'+index)}" :name="'a'+index" type="number" :disabled="loading"></td>
          <td><input v-model="row.price" v-validate="'numeric|min_value:0'" :class="{'input has-text-centered is-medium': true, 'is-danger': errors.has('p'+index)}" :name="'p'+index" type="number" :disabled="loading"></td>
        </template>
        <td class="has-text-right">{{ getRowSum(row.amount, row.price) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td class="is-size-5 has-text-weight-semibold">Summa</td>
        <td class="has-text-right is-size-5 has-text-weight-semibold">{{ grandTotal }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  inject: ['$validator'],
  props: ['loading'],
  data() {
    return {
      rows: [{}]
    };
  },

  mounted() {
    // Works because rows is an complex datatype (object)
    // No need to listen for changes
    this.$emit('items', this.rows);
  },

  methods: {
    getRowSum(amount, price) {
      if (!amount || !price) return '';
      return amount * price + ' kr';
    },

    calculateRows() {
      let error = false;

      // Check if every field has been filled
      this.rows.forEach(row => {
        if (!row.description || !row.amount || !row.price) error = true;
      });

      // Add a row if that's the case
      if (!error) this.addRow();
    },

    addRow() {
      this.rows.push({});
    }
  },

  computed: {
    grandTotal() {
      let sum = 0;

      this.rows.forEach(row => {
        if (!row.amount || !row.price) return;
        sum += row.amount * row.price;
      });

      return isNaN(sum) ? '0 kr' : sum + ' kr';
    }
  }
};
</script>

<style scoped>
td {
  vertical-align: middle;
}
</style>
