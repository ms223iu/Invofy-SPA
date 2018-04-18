export let ObjectUtil = {

  methods: {
    isEmpty(object) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },

    isEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
  }
};