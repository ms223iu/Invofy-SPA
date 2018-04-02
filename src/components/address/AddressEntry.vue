<template>
  <b-collapse class="card" :open="false">
    <div slot="trigger" slot-scope="props" class="card-header">
      <div class="card-header-title">{{ address.displayName }}</div>
      <a class="card-header-icon">
        <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
      </a>
    </div>
    <div class="card-content">
      <div v-if="isEditing">
        <div>
          <div class="field">
            <label class="label">Visningsnamn</label>
            <p :class="{ 'control': true }">
              <input v-model="address.displayName" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('visningsnamn')}" name="visningsnamn" type="text" placeholder="visningsnamn" :disabled="isLoading">
              <span v-show="errors.has('visningsnamn')" class="help is-danger">{{ errors.first('visningsnamn') }}</span>
            </p>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Namn</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.customer" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('namn')}" name="namn" type="text" placeholder="namn" :disabled="isLoading">
                  <span v-show="errors.has('namn')" class="help is-danger">{{ errors.first('namn') }}</span>
                </p>
              </div>

              <div class="field">
                <label class="label">Adressrad 1</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.addr1" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('adressrad1')}" name="adressrad1" type="text" placeholder="adressrad 1" :disabled="isLoading">
                  <span v-show="errors.has('adressrad1')" class="help is-danger">{{ errors.first('adressrad1') }}</span>
                </p>
              </div>

              <div class="field">
                <label class="label">Adressrad 2</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.addr2" :class="{'input': true, 'is-danger': errors.has('adressrad2')}" name="adressrad2" type="text" placeholder="adressrad 2" :disabled="isLoading">
                  <span v-show="errors.has('adressrad2')" class="help is-danger">{{ errors.first('adressrad2') }}</span>
                </p>
              </div>

              <div class="field">
                <label class="label">Postnummer</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.post" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('postnummer')}" name="postnummer" type="text" placeholder="postnummer" :disabled="isLoading">
                  <span v-show="errors.has('postnummer')" class="help is-danger">{{ errors.first('postnummer') }}</span>
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label">Stad</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.city" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('stad')}" name="stad" type="text" placeholder="stad" :disabled="isLoading">
                  <span v-show="errors.has('stad')" class="help is-danger">{{ errors.first('stad') }}</span>
                </p>
              </div>

              <div class="field">
                <label class="label">Land</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.country" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('land')}" name="land" type="text" placeholder="land" :disabled="isLoading">
                  <span v-show="errors.has('land')" class="help is-danger">{{ errors.first('land') }}</span>
                </p>
              </div>
              <div class="field">
                <label class="label">Referensrad 1</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.ref1" :class="{'input': true, 'is-danger': errors.has('referensrad1')}" name="referensrad1" type="text" placeholder="referensrad 1" :disabled="isLoading">
                  <span v-show="errors.has('referensrad1')" class="help is-danger">{{ errors.first('referensrad1') }}</span>
                </p>
              </div>
              <div class="field">
                <label class="label">Referensrad 2</label>
                <p :class="{ 'control': true }">
                  <input v-model="address.ref2" :class="{'input': true, 'is-danger': errors.has('referensrad2')}" name="referensrad2" type="text" placeholder="referensrad 2" :disabled="isLoading">
                  <span v-show="errors.has('referensrad2')" class="help is-danger">{{ errors.first('referensrad2') }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <p class="title has-text-centered is-size-4 mb-1">Förhandsgranskning</p>
      </div>
      <AddressPreview :address="address"></AddressPreview>
    </div>
    <footer class="card-footer">
      <a v-if="isRemoving" class="card-footer-item has-text-success has-text-weight-semibold" @click="cancelRemove()">Avbryt</a>
      <a v-if="!isEditing && !isRemoving" class="card-footer-item has-text-info has-text-weight-semibold" @click="startEdit()">Ändra</a>
      <a v-if="!isEditing" class="card-footer-item has-text-danger has-text-weight-bold" @click="removeAddress(address._id)">{{ removeBtnText }}</a>
      <a v-if="isEditing" class="card-footer-item has-text-black has-text-weight-semibold" @click="cancelEdit()">Avbryt</a>
      <a v-if="isEditing" class="card-footer-item has-text-success has-text-weight-bold" @click="saveAddress(address._id)">Spara</a>
    </footer>
  </b-collapse>
</template>

<script>
import AddressPreview from '../address/AddressPreview';
import { Toast } from '../../mixins/Toast';
export default {
  components: { AddressPreview },
  props: ['data'],
  mixins: [Toast],

  data() {
    return {
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

    saveAddress(id) {
      this.$validator.validateAll().then(result => {
        if (!result) return;

        if (
          JSON.stringify(this.address) === JSON.stringify(this.addressBackup)
        ) {
          this.cancelEdit();
          return;
        }

        this.apiUpdateAddress(id);
      });
    },

    removeAddress(id) {
      if (!this.safeToRemove && !this.isRemoving) {
        this.isRemoving = true;
        this.removeBtnText = 'Är du säker? (5)';
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
      this.removeBtnText = 'Är du säker? (' + (5 - this.secondsElapsed) + ')';
      if (this.secondsElapsed == 5) {
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
          this.$parent.$emit('ADDRESS_REMOVED', id);
        })
        .catch(err => {
          const status = err.response.status;
          this.showErrorToast('Något gick fel. Försök igen senare');
        });
    }
  }
};
</script>

<style scoped>
.label {
  color: black;
}
</style>