<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="input-field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="input-field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="submit-button">
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async register() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      try {
        await axios.post('http://localhost:8000/api/registration/', userData);
        this.$router.push({ name: 'ProductList' });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 50px auto;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-field label {
  margin-bottom: 10px;
}

.submit-button {
  display: flex;
  justify-content: center;
}

.submit-button button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
