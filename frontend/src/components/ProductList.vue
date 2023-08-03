<template>
  <div class="product-list">
    <div class="product-card" v-for="product in products" :key="product.id">
      <img :src="product.image" alt="Product Image" class="product-image">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p class="price">${{ product.price }}</p>
      <button class="add-to-cart-button" @click="addToCart(product)">Add to Cart</button>
      <router-link class="details-link" :to="{ name: 'ProductDetail', params: { id: product.id } }">View
        Details</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    ...mapActions(['addToCart'])
  },
  created() {
    this.$store.dispatch('fetchProducts');
  }
}
</script>

<style scoped>
body {
  background-color: #f7f7f7;
  font-family: 'Roboto', sans-serif;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
}

.product-card h2 {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.2em;
}

.product-card p {
  font-size: 0.9em;
  margin-bottom: 1rem;
  text-align: center;
}

.product-card .price {
  color: #dc3545;
  font-size: 1.2em;
  margin-bottom: 1rem;
}

.product-card .add-to-cart-button {
  background-color: #dc3545;
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  transition: background-color 0.3s ease;
}

.product-card .add-to-cart-button:hover {
  background-color: #b32845;
}

.product-card .details-link {
  margin-top: 0.5rem;
  text-decoration: none;
  color: #636363;
  font-size: 0.8em;
}

.product-card .product-image {
  width: 70%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
