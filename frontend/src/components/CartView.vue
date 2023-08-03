<template>
  <div class="cart-view-container">
    <div class="cart-container">
      <h2>Your Cart</h2>
      <p v-if="!cart || !cart.length" class="empty-cart">Your cart is empty.</p>
      <div class="cart-item" v-else v-for="item in cart" :key="item.product.id">
        <img :src="item.product.image" alt="Product Image" class="product-image">
        <h3>{{ item.product.name }}</h3>
        <p>${{ item.product.price }}</p>
        <button class="remove-btn" @click="removeFromCart(item.product)">Remove from Cart</button>
      </div>
      <router-link to="/order" class="order-btn" v-if="cart && cart.length">Place Order</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartView',
  methods: {
    ...mapActions(['removeFromCart'])
  },
  computed: {
    ...mapGetters(['cart'])
  }
}
</script>

<style scoped>
.cart-view-container {
  padding-bottom: 70px;
}

.cart-container {
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

.cart-item {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0.5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.empty-cart {
  font-style: italic;
  font-size: 0.9em;
  margin-bottom: 1rem;
  text-align: center;
}

.cart-item h3 {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.2em;
}

.cart-item p {
  color: #dc3545;
  font-size: 1.2em;
  margin-bottom: 1rem;
}

.remove-btn {
  background-color: #dc3545;
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #b32845;
}

.order-btn {
  background-color: #394eec;
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  transition: background-color 0.3s ease;
  text-decoration: none;
  margin-top: 20px;
}

.order-btn:hover {
  background-color: #7e7e7e;
}
</style>
