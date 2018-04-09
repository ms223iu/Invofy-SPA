<template>
  <div class="has-text-centered is-size-4">
    <div class="address-preview">
      <p v-if="address.customer">{{ address.customer }}</p>
      <p v-else>Kundnamn</p>

      <p v-if="address.addr1">{{ address.addr1 }}</p>
      <p v-else>Adressrad 1</p>

      <p v-if="address.addr2">{{ address.addr2 }}</p>

      <p>
        <span v-if="address.post">{{ address.post }}</span>
        <span v-else>Postnummer</span>
        <span v-if="address.city">{{ address.city }}</span>
        <span v-else>Stad</span>
      </p>

      <p v-if="address.country">{{ address.country }}</p>
      <p v-else>Land</p>

      <br v-if="address.ref1 || address.ref2">
      <p v-if="address.ref1">{{ address.ref1 }}</p>
      <p v-if="address.ref2">{{ address.ref2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['address']
};
</script>

<style scoped>
.address-preview {
  display: inline-block;
  text-align: left;
}
</style>



