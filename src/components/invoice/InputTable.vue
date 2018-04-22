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
      <tr v-for="(row, index) in rows" :key="index">
        <td><input v-model="row.description" class="input" type="text"></td>
        <td><input v-model="row.amount" class="input" type="number"></td>
        <td><input v-model="row.price" class="input" type="number"></td>
        <td>{{row.amount * row.price}} kr</td>
      </tr>
      <tr>
        <td>
          <button class="button is-info is-fullwidth" type="button" @click=addRow()>Lägg till en rad</button>
        </td>
        <td></td>
        <td>Summa</td>
        <td>{{ getTotalSum }} kr</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      rows: [{}]
    };
  },
  watch: {
    rows() {
      var length = this.rows.length - 1;
      if (
        this.rows[length].description &&
        this.rows[length].amount &&
        this.rows[length].price
      ) {
        this.addRow();
      }
    }
  },

  computed: {
    getTotalSum() {
      let sum = 0;

      this.rows.forEach(row => {
        sum += row.amount * row.price;
      });

      return isNaN(sum) ? 0 : sum;
    }
  },

  methods: {
    addRow() {
      this.rows.push({});
    }
  }
};
</script>

<style>

</style>
