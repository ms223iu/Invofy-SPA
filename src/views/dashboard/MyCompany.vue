<template>
  <div>
    <SectionInfo>Företagsinformation som du ser nedan kommer att automatiskt finnas på alla nya fakturor. Vid informationsändring förändras inte infon på befintliga fakturor.</SectionInfo>
    <InputForm :readOnly="!isEditing" :data="company" @response="response"></InputForm>

    <button v-if="!isEditing" class="button is-danger is-medium is-fullwidth mt-1" @click="edit">Ändra</button>

    <div v-else class="is-pulled-right mt-1 mb-2">
      <button class="button is-info is-medium" @click="cancel">Avbryt</button>
      <button class="button is-success is-medium" @click="save">Spara ändringar</button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Toast } from '../../mixins/Toast';
import { ObjectUtil } from '../../mixins/ObjectUtil';
import SectionInfo from '../../components/dashboard/SectionInfo';
import InputForm from '../../components/company/InputForm';

export default {
  components: { SectionInfo, InputForm },
  mixins: [Toast, ObjectUtil],
  data() {
    return {
      company: {},
      companyOld: {},
      isEditing: false
    };
  },

  created() {
    this.apiGetCompanyInfo();
  },

  methods: {
    edit() {
      this.isEditing = true;
      this.companyOld = JSON.parse(JSON.stringify(this.company));
    },

    save() {
      EventBus.$emit('COMPANY_INPUT_VALIDATE');
    },

    cancel() {
      this.isEditing = false;
      this.company = this.companyOld;
      this.companyOld = {};
    },

    response() {
      if (this.isEqual(this.company, this.companyOld)) {
        this.isEditing = false;
        return;
      }

      this.apiSaveCompanyInfo();
    },

    apiGetCompanyInfo() {
      axios
        .get('api/company')
        .then(response => {
          this.company = response.data;
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        });
    },

    apiSaveCompanyInfo() {
      axios
        .put('api/company', this.company)
        .then(response => {
          this.showSuccessToast('Ändringarna sparades', 1500);
        })
        .catch(error => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        })
        .finally(() => {
          this.isEditing = false;
        });
    }
  }
};
</script>

<style scoped>

</style>
