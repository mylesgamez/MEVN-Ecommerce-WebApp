import { createStore } from 'vuex';
import axios from 'axios';
import router from './router.js';

const state = {
    user: null,
    status: null,
    error: null,
    token: localStorage.getItem('token') || '',
    isLogged: !!localStorage.getItem('token'),
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: []
};

const getters = {
    isLoggedIn: state => state.isLogged,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    cart: state => state.cart,
    products: state => state.products,
    totalPrice: state => {
        let total = 0;
        state.cart.forEach(item => {
            total += item.product.price * item.quantity;
        });
        return total;
    }
};

const actions = {
    async login({ commit }, user) {
        commit('auth_request');
        try {
            let res = await axios.post('http://localhost:8000/api/auth/token/', user)
            if (res.data.access) {
                commit('set_token', res.data.access);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access;
                commit('auth_success', user);
                commit('change_status', 'success');
                commit('user_detail', res.data);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    async register({ commit }, userData) {
        commit('register_request');
        let res = await axios.post('http://localhost:8000/api/users/', userData);
        if (res.data.success !== undefined) {
            commit('register_success');
        }
        return res;
    },
    async logout({ commit }) {
        commit('remove_token');
        router.push('/login');
        return;
    }, async fetchProducts({ commit }) {
        let res = await axios.get('http://localhost:8000/api/products/');
        commit('setProducts', res.data);
    },
    addToCart({ commit }, product) {
        commit('addToCart', product);
    },
    removeFromCart({ commit }, product) {
        commit('removeFromCart', product);
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
    },
    isLoggedIn(state) {
        state.isLogged = true;
    },
    set_token(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        state.isLogged = true; // update isLogged state here
    },
    remove_token(state) {
        state.token = '';
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        state.isLogged = false;
    },
    auth_success(state, user) {
        state.user = user;
        state.status = 'success';
        state.isLogged = true;
    },
    auth_error(state, err) {
        state.error = err.response.data.msg;
    },
    register_request(state) {
        state.status = 'loading';
    },
    user_detail(state, user) {
        state.user = user;
    },
    register_success(state) {
        state.status = 'success';
    },
    logout(state) {
        state.status = null;
        state.user = null;
    },
    setProducts(state, products) {
        state.products = products;
    },
    addToCart(state, product) {
        let item = state.cart.find(item => item.product.id === product.id);
        if (!item) {
            state.cart.push({ product, quantity: 1 });
        } else {
            item.quantity++;
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, product) {
        const item = state.cart.find(item => item.product.id === product.id);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else {
            state.cart = state.cart.filter(item => item.product.id !== product.id);
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
};

const store = createStore({
    state,
    actions,
    mutations,
    getters
});

export default store;
