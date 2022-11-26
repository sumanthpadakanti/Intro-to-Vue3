app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" :class="{'out-of-stock-img': !inStock}" />
          </div>
          <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <p v-if="onSale">{{sale}}</p>
            <ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              @mouseover="onMouseOver(index)"
              class="color-circle"
              :style="{backgroundColor: variant.color}"
            ></div>
            <button
              class="button"
              :class="{disabledButton: !inStock}"
              :disabled="!inStock"
              v-on:click="addtoCart"
            >
              Add to Cart
            </button>
            <button class="button" v-on:click="removeFromCart">
              Remove from Cart
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
  data() {
    return {
      selectedIndex: 0,
      brand: "Vue Mastery",
      product: "Socks",
      onSale: true,
      details: ["50% Cotton", "30% Wool", "20% Polyster"],
      sizes: ["Small", "Medium", "Large"],
      reviews: [],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedIndex].image;
    },
    inStock() {
      return this.variants[this.selectedIndex].quantity;
    },
    sale() {
      return this.brand + " " + this.product + " is on Sale";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
  methods: {
    addtoCart() {
      this.$emit("add-to-cart", this.variants[this.selectedIndex].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedIndex].id);
    },
    onMouseOver(index) {
      this.selectedIndex = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
});
