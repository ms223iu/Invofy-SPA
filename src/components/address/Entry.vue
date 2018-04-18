<template>
  <b-collapse class="card" :open="false" animation="none">
    <div slot="trigger" slot-scope="props" class="card-header">
      <div class="card-header-title">{{ address.displayName }}</div>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div v-if="isEditing">
        <AddressInputForm v-if="isEditing" :data="address" :isLoading="isLoading" @response="response" @addressChanged="addressChanged"></AddressInputForm>
        <hr>
      </div>

      <AddressPreview :address="address"></AddressPreview>
    </div>
    <footer class="card-footer">
      <a v-if="isRemoving" class="card-footer-item has-text-success has-text-weight-semibold" @click="cancelRemove()">Avbryt</a>
      <a v-if="!isEditing && !isRemoving" class="card-footer-item has-text-info has-text-weight-semibold" @click="startEdit()">Ändra</a>
      <a v-if="!isEditing" class="card-footer-item has-text-danger has-text-weight-bold" @click="removeAddress(address._id)">{{ removeBtnText }}</a>
      <a v-if="isEditing" class="card-footer-item has-text-black has-text-weight-semibold" @click="cancelEdit()">Avbryt</a>
      <a v-if="isEditing" class="card-footer-item has-text-success has-text-weight-bold" @click="save()">Spara</a>
    </footer>
  </b-collapse>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Toast } from '../../mixins/Toast';
import { ObjectUtil } from '../../mixins/ObjectUtil';
import AddressInputForm from '../address/InputForm';
import AddressPreview from '../address/Preview';

export default {
  components: { AddressPreview, AddressInputForm },
  props: ['data'],
  mixins: [Toast, ObjectUtil],

  data() {
    return {
      removeConstant: 3,
      isEditing: false,
      isLoading: false,
      address: this.data,
      addressBackup: null,
      removeBtnText: 'Ta bort',
      safeToRemove: false,
      isRemoving: false,
      removeInterval: null,
      secondsElapsed: 0
    };
  },

  methods: {
    startEdit() {
      this.isEditing = true;
      this.addressBackup = JSON.parse(JSON.stringify(this.data));
    },

    cancelEdit() {
      this.isEditing = false;
      this.address = this.addressBackup;
    },

    addressChanged(address) {
      this.address = address;
    },

    save() {
      EventBus.$emit('ADDRESS_INPUT_VALIDATE');
    },

    response(response) {
      if (this.isEqual(this.address, this.addressBackup)) {
        this.cancelEdit();
        return;
      }

      this.apiUpdateAddress(response._id);
    },

    removeAddress(id) {
      if (!this.safeToRemove && !this.isRemoving) {
        this.isRemoving = true;
        this.removeBtnText = 'Är du säker? (' + this.removeConstant + ')';
        this.removeInterval = setInterval(() => {
          this.removeAddressTimer();
        }, 1000);
      } else if (this.safeToRemove) {
        this.apiDeleteAddress(id);
      }
    },

    cancelRemove() {
      this.isRemoving = false;
      this.removeBtnText = 'Ta bort';
      this.secondsElapsed = 0;
      this.safeToRemove = false;
      clearInterval(this.removeInterval);
    },

    removeAddressTimer() {
      this.secondsElapsed++;
      this.removeBtnText =
        'Är du säker? (' + (this.removeConstant - this.secondsElapsed) + ')';
      if (this.secondsElapsed == this.removeConstant) {
        this.safeToRemove = true;
        clearInterval(this.removeInterval);
        this.removeBtnText = 'Bekräfta';
      }
    },

    apiUpdateAddress(id) {
      this.isLoading = true;

      axios
        .put('api/address/' + id, this.address)
        .then(response => {
          this.isEditing = false;
          this.showSuccessToast('Ändringarna sparades', 2000);
        })
        .catch(err => {
          const status = err.response.status;
          this.address = this.addressBackup;

          if (status == 409) {
            this.showErrorToast('Det finns redan en adress med detta namnet');
          } else {
            this.showErrorToast('Något gick fel. Försök igen senare');
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    apiDeleteAddress(id) {
      axios
        .delete('api/address/' + id)
        .then(response => {
          this.showSuccessToast('Adress borttagen', 2000);
          this.$emit('addressRemoved', id);
        })
        .catch(err => {
          this.showErrorToast('Något gick fel. Försök igen senare');
        });
    }
  }
};
</script>

<style scoped>
.label {
  color: #4a4a4a;
}
</style>