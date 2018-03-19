export var Toast = {
  methods: {
    showSuccessToast: function (message, duration = 3000) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-success'
      });
    },

    showErrorToast: function (message, duration = 3000) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-danger'
      });
    }
  }
};