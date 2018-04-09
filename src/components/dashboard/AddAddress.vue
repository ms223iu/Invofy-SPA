<template>
  <div>
    <AddressInputForm :isLoading="isLoading" @response="response" @addressChanged="addressChanged"></AddressInputForm>

    <hr>
    <AddressPreview v-show="address" :address="address"></AddressPreview>
    <hr>

    <div class="is-pulled-right">
      <button class="button is-info is-medium" @click="clear()">Rensa</button>
      <button class="button is-success is-medium" @click="save()">Lägg till mottagare ({{ isLoading }})</button>
    </div>
  </div>

</template>

<script>
import { EventBus } from '../../event-bus';
import { Toast } from '../../mixins/Toast';
import AddressInputForm from '../address/InputForm';
import AddressPreview from '../address/Preview';

export default {
  components: { AddressInputForm, AddressPreview },
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
      EventBus.$emit('ADDRESS_INPUT_CLEAR');
    },

    response(result) {
      this.isLoading = true;
      this.apiCreateAddress(result);
    },

    addressChanged(address) {
      this.address = address;
    },

    apiCreateAddress(address) {
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
