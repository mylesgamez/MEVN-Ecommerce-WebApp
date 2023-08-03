<template>
  <div class="order-view">
    <h2>Place Your Order</h2>

    <div v-for="item in cart" :key="item.product.id" class="cart-item">
      <div class="product-info">
        <img :src="item.product.image" alt="Product Image" class="product-img" />
        <h3>{{ item.product.name }}</h3>
      </div>
    </div>

    <h3>Billing Information</h3>
    <form class="info-form">
      <input class="info-input" type="text" v-model="billingName" placeholder="Name">
      <input class="info-input" type="email" v-model="billingEmail" placeholder="Email">
      <input class="info-input" type="text" v-model="billingPhone" placeholder="Phone">
      <input class="info-input" type="text" v-model="billingAddress" placeholder="Address">
      <input class="info-input" type="text" v-model="billingCity" placeholder="City">
      <input class="info-input" type="text" v-model="billingCountry" placeholder="Country">
    </form>

    <h3>Shipping Information</h3>
    <form class="info-form">
      <input class="info-input" type="text" v-model="shippingName" placeholder="Name">
      <input class="info-input" type="email" v-model="shippingEmail" placeholder="Email">
      <input class="info-input" type="text" v-model="shippingPhone" placeholder="Phone">
      <input class="info-input" type="text" v-model="shippingAddress" placeholder="Address">
      <input class="info-input" type="text" v-model="shippingCity" placeholder="City">
      <input class="info-input" type="text" v-model="shippingCountry" placeholder="Country">
    </form>

    <h2>Your Total: ${{ totalPrice.toFixed(2) }}</h2>
    <button class="order-button" :disabled="isLoading" @click="checkoutWithStripe">Checkout with Stripe</button>
    <p v-if="isLoading">Processing your order...</p>
  </div>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'OrderView',
  data() {
    return {
      isLoading: false,
      billingName: '',
      billingEmail: '',
      billingPhone: '',
      billingAddress: '',
      billingCity: '',
      billingCountry: '',
      shippingName: '',
      shippingEmail: '',
      shippingPhone: '',
      shippingAddress: '',
      shippingCity: '',
      shippingCountry: ''
    }
  },
  computed: {
    ...mapGetters(['cart', 'totalPrice'])
  },
  methods: {
    checkoutWithStripe() {
      // Your stripe checkout logic here
      console.log("Implement Stripe checkout here");
    },
    async placeOrder() {
      this.isLoading = true;
      try {
        await axios.post('http://localhost:8000/api/orders/', {
          products: this.cart.map(item => item.id)
        });
        this.$store.dispatch('clearCart');
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.order-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 80px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 50%;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.info-form {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.info-input {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.07);
}

.order-button {
  background-color: #394eec;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.order-button:hover {
  background-color: #b32845;
}

.order-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
