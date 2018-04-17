<template>
  <div>
    <SectionInfo>Informationen om ditt företag som du ser nedan kommer automatiskt att finnas på alla nya fakturor och den kan inte ändras efter att en faktura har blivit skapad.</SectionInfo>
    <InputForm></InputForm>
  </div>
</template>

<script>
import SectionInfo from '../../components/dashboard/SectionInfo';
import InputForm from '../../components/company/InputForm';

export default {
  components: { SectionInfo, InputForm }
};
</script>

<style scoped>

</style>
