<template>
  <div @keyup.enter="validateForm()">
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Adressrad 1*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.addr1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('adressrad1')}" name="adressrad1" type="text" placeholder="adressrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Adressrad 2</label>
          <p :class="{ 'control': true }">
            <input v-model="company.addr2" :class="{'input': true, 'is-danger': errors.has('adressrad2')}" name="adressrad2" type="text" placeholder="adressrad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Postnummer*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.post" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('postnummer')}" name="postnummer" type="text" placeholder="postnummer" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field ">
          <label class="label">Stad*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.city" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('stad')}" name="stad" type="text" placeholder="stad" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Land*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.country" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('land')}" name="land" type="text" placeholder="land" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">Företagsnamn*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('namn')}" name="namn" type="text" placeholder="namn" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Ägare*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.holder" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('ägare')}" name="ägare" type="text" placeholder="ägare" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Telefonnummer*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.phone" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('telefonnummer')}" name="telefonnummer" type="text" placeholder="telefonnummer" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>

        <div class="field">
          <label class="label">Organisationsnummer*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.org" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('organisationsnummer')}" name="organisationsnummer" type="text" placeholder="organisationsnummer" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>
        <div class="field">
          <label class="label">Kontonummer*</label>
          <p :class="{ 'control': true }">
            <input v-model="company.bankacc" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('kontonummer')}" name="kontonummer" type="text" placeholder="kontonummer" autocomplete="off" autocorrect="off" spellcheck="false" :readonly="readOnly">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import { Focus } from '../../mixins/Focus';

export default {
  props: ['readOnly', 'company'],
  mixins: [Focus],

  created() {
    EventBus.$on('COMPANY_INPUT_VALIDATE', () => {
      this.validateForm();
    });
  },

  methods: {
    validateForm() {
      if (this.readOnly) return;

      this.$validator.validateAll().then(result => {
        if (!result) {
          this.focusOnValidationError(this.$el);
          return;
        }

        this.$emit('response');
      });
    }
  }
};
</script>

<style scoped>
.label {
  color: #4a4a4a;
}

.column {
  padding-top: 0;
}
</style>
