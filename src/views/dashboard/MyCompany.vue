<template>
  <div>
    <SectionInfo>Företagsinformation som du ser nedan kommer att finnas automatiskt på alla dina nya fakturor. Vid informationsändring förändras inte infon på befintliga fakturor.</SectionInfo>
    <InputForm :readOnly="!isEditing"></InputForm>

    <button v-if="!isEditing" class="button is-danger is-medium is-fullwidth mt-2" @click="edit">Ändra</button>
    <button v-else class="button is-success is-medium is-fullwidth mt-2" @click="save">Spara ändringar</button>
  </div>
</template>

<script>
import { Toast } from '../../mixins/Toast';
import SectionInfo from '../../components/dashboard/SectionInfo';
import InputForm from '../../components/company/InputForm';

export default {
  components: { SectionInfo, InputForm },
  mixins: [Toast],
  data() {
    return {
      isEditing: false
    };
  },

  methods: {
    edit() {
      this.isEditing = true;
    },

    save() {
      this.isEditing = false;
      this.showSuccessToast('Ändringarna sparades', 1500);
    },

    apiGetCompanyInfo() {},

    apiSaveCompanyInfo() {}
  }
};
</script>

<style scoped>

</style>
