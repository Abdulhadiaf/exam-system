// src/store/index.js
import { createStore } from 'vuex'
import axios from 'axios'
import subjects from './modules/subjects'
import papers from './modules/papers'
import questions from './modules/questions'

export default createStore({
  modules: {
    subjects,
    papers,
    questions
  },
  state: {
    token: localStorage.getItem('authToken'),
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('userName'),
    useremail: localStorage.getItem('userEmail'),
    userRole: localStorage.getItem('userRole'),
    current_time: '',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userRole', user.role);
    },
    CLEAR_AUTH(state) {
      state.token = '';
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
    },
    SET_CURRENT_TIME(state) {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      state.current_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        const { token, user } = response.data;
        console.log(user);
        localStorage.setItem('authToken', token);

        commit('SET_TOKEN', token);
        commit('SET_USER', user);
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
    },
    async logout({ commit }) {
      const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      });
      commit('CLEAR_AUTH');
    },
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        commit('SET_USER', response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        throw error;
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        console.log(response.data);
        commit('SET_USERS', response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
        throw error;
      }
    },
    async fetchSubjects({ commit }) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/subject', {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        commit('SET_SUBJECTS', response.data);
      } catch (error) {
        console.error('Failed to fetch subjects', error);
        throw error;
      }
    },
    refreshCurrentTime({ commit }) {
      commit('SET_CURRENT_TIME');
    },
  },
  getters: {
    isAuthenticated: state => state.token ? true : false,
    getUser: state => state.user,
    getUsers: state => state.users,
  }
})
