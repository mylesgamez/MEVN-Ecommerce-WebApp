<template>
  <nav class="navbar">
    <div class="nav-items">
      <router-link to="/" class="nav-item">Products</router-link>
      <router-link to="/cart" class="nav-item">Cart</router-link>
      <router-link to="/login" class="nav-item" v-if="!isLoggedIn">Login</router-link>
    </div>
    <button class="logout-button" v-if="isLoggedIn" @click="logout">Logout</button>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppNavbar',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e7e7e7;
}

.nav-items {
  display: flex;
}

.nav-item {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
}

.nav-item:hover {
  color: #007bff;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
