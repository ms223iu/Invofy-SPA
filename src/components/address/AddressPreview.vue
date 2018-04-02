<template>
  <div>
    <table class="table is-fullwidth">
      <tr>
        <td>Namn</td>
        <td>{{ address.customer }}</td>
      </tr>
      <tr>
        <td>Adressrad 1</td>
        <td>{{ address.addr1 }}</td>
      </tr>
      <tr v-if="address.addr2">
        <td>Adressrad 2</td>
        <td>{{ address.addr2 }}</td>
      </tr>
      <tr>
        <td>Postnummer</td>
        <td>{{ address.post }}</td>
      </tr>
      <tr>
        <td>Land</td>
        <td>{{ address.country }}</td>
      </tr>
      <tr v-if="address.ref1">
        <td>Referensrad 1</td>
        <td>{{ address.ref1 }}</td>
      </tr>
      <tr v-if="address.ref2">
        <td>Referensrad 2</td>
        <td>{{ address.ref2 }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['address']
};
</script>


