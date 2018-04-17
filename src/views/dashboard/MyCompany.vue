<template>
  <div>
    <p class="has-text-centered is-size-5">Informationen om ditt företag som du ser kan nedan kommer automatiskt att finnas på alla dina nya fakturor.</p>
    <hr>
    <InputForm></InputForm>
  </div>
</template>

<script>
import InputForm from '../../components/company/InputForm';

export default {
  components: { InputForm }
};
</script>

<style scoped>
hr {
  margin-bottom: 2rem;
}
</style>
