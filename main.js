const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
      details: ["detail1", "detail2"],
    };
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      const removeItem = this.cart.indexOf(id);
      if (removeItem > -1) {
        this.cart.splice(removeItem, 1);
      }
    },
  },
  computed: {},
});
