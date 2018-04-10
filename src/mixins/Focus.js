export let Focus = {
  methods: {
    focusOnValidationError($el) {
      this.$el.querySelector('[data-vv-id="' + this.$validator.errors.items[0].id + '"]').focus();
    },
  }
};