<template>
  <div class="is-size-5">
    <div class="columns">
      <div class="column preview">
        <p>{{ data.name }}</p>
        <p>{{ data.addr1 }}</p>
        <p>{{ data.addr2 }}</p>
        <p>{{ data.post }} {{ data.city }}</p>
        <p>{{ data.country }}</p>
      </div>
      <div class="column preview">
        <p>Ägare: {{ data.holder }}</p>
        <p>Telefon: {{ data.phone }}</p>
        <p>Org. Nr: {{ data.org }}</p>
        <p>{{ data.bankacc }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },

  created() {
    this.apiGetCompany();
  },

  methods: {
    apiGetCompany() {
      axios.get('api/company').then(response => {
        this.data = response.data;
      });
    }
  }
};
</script>

<style scoped>
.preview {
  display: inline-block;
  text-align: left;
}
</style>
