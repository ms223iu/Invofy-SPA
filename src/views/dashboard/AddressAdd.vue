<template>
  <div>
    <SectionInfo>Här kan du lägga till information nya mottagare. Dessa går sedan att använda när du skapar en ny faktura.</SectionInfo>
    <AddressInputForm :isLoading="isLoading" @response="response" @addressChanged="addressChanged"></AddressInputForm>

    <hr>
    <AddressPreview :address="address"></AddressPreview>
    <hr>

    <div class="is-pulled-right mb-1">
      <button :class="[isLoading ? 'is-loading': '', 'button is-info is-medium']" @click="clear()">Rensa</button>
      <button :class="[isLoading ? 'is-loading': '', 'button is-success is-medium']" @click="save()" :disabled="isLoading">Lägg till mottagare</button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Toast } from '../../mixins/Toast';
import AddressInputForm from '../../components/address/InputForm';
import AddressPreview from '../../components/address/Preview';
import SectionInfo from '../../components/dashboard/SectionInfo';

export default {
  components: { SectionInfo, AddressInputForm, AddressPreview },
  mixins: [Toast],
  data() {
    return {
      address: {},
      validate: false,
      isLoading: false
    };
  },

  methods: {
    save() {
      EventBus.$emit('ADDRESS_INPUT_VALIDATE');
    },

    clear() {
      this.address = {};
      EventBus.$emit('ADDRESS_INPUT_CLEAR');
    },

    response(result) {
      this.apiCreateAddress(result);
    },

    addressChanged(address) {
      this.address = address;
    },

    apiCreateAddress(address) {
      this.isLoading = true;

      axios
        .post('api/address', address)
        .then(response => {
          this.showSuccessToast('Adress skapades');
          this.$router.push('/dashboard/address');
        })
        .catch(err => {
          const status = err.response.status;

          if (status == 409) {
            this.showErrorToast('Det finns redan en adress med detta namnet');
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
