<template>
  <div>
    <SectionInfo>Företagsinformation som du ser nedan kommer att finnas automatiskt på alla dina nya fakturor. Vid informationsändring förändras inte infon på befintliga fakturor.</SectionInfo>
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
