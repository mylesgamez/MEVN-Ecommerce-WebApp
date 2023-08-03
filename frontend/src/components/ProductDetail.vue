<template>
  <div class="product-detail" v-if="product">
    <img class="product-image" :src="`${product.image}`" alt="Product Image">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <div class="price-and-button">
      <p class="price">${{ product.price }}</p>
      <button class="add-to-cart-button" @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapActions(['addToCart'])
  },
  computed: {
    ...mapGetters(['products'])
  },
  watch: {
    products: {
      immediate: true,
      handler(newVal) {
        this.product = newVal.find(product => product.id === parseInt(this.$route.params.id));
      }
    }
  }
}
</script>

<style scoped>
.product-detail {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
  max-width: 500px;
  margin: 1rem auto;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-detail h2 {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.2em;
  text-align: center;
}

.product-detail p {
  font-size: 0.9em;
  margin-bottom: 1rem;
  text-align: center;
}

.price {
  color: #dc3545;
  font-size: 1.2em;
  margin-bottom: 1rem;
}

.price-and-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-to-cart-button {
  background-color: #dc3545;
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #b32845;
}
</style>
