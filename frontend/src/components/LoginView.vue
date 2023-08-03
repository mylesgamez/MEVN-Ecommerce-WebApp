<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="button-container">
        <button type="submit" class="login-btn">Login</button>
      </div>
    </form>
    <div class="button-container">
      <button class="register-btn" @click.prevent="goToRegister">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      try {
        // change the URL to match the Django JWT authentication URL
        const response = await axios.post('http://localhost:8000/api/auth/token/', userData);
        this.$store.commit('set_token', response.data.access);  // Corrected line here
        this.$router.push({ name: 'ProductList' });
      } catch (err) {
        console.log(err);
      }
    },
    goToRegister() {
      this.$router.push({ name: 'RegisterView' });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.login-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>