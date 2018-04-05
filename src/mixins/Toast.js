export var Toast = {
  data() {
    return {
      defaultDuration: 3000
    };
  },

  methods: {
    showSuccessToast: function (message, duration = this.defaultDuration) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-success'
      });
    },

    showErrorToast: function (message, duration = this.defaultDuration) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-danger'
      });
    }
  }
};