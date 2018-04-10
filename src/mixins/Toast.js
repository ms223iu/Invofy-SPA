export let Toast = {
  data() {
    return {
      defaultDuration: 2500
    };
  },

  methods: {
    showSuccessToast(message, duration = this.defaultDuration) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-success'
      });
    },

    showErrorToast(message, duration = this.defaultDuration) {
      this.$toast.open({
        message: message,
        duration: duration,
        type: 'is-danger'
      });
    }
  }
};