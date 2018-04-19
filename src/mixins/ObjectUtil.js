export let ObjectUtil = {

  methods: {
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    isEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
  }
};