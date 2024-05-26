import { createStore } from 'vuex'
import axios from 'axios'
import subjects from './modules/subjects'
import papers from './modules/papers'
import questions from './modules/questions'
import { API_URL } from '../config/constant.js';

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
    countdown: 0,
    countdownInterval: null,
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
    SET_COUNTDOWN(state, countdown) {
      state.countdown = countdown;
    },
    CLEAR_COUNTDOWN_INTERVAL(state) {
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
      }
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${API_URL}/login`, credentials);
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
      const response = await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      });
      commit('CLEAR_AUTH');
    },
    async fetchUser({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/user`, {
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
        const response = await axios.get(`${API_URL}/users`, {
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
        const response = await axios.get(`${API_URL}/subject`, {
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
    startCountdown({ commit, state }, duration) {
      commit('CLEAR_COUNTDOWN_INTERVAL');
      commit('SET_COUNTDOWN', duration);

      state.countdownInterval = setInterval(() => {
        if (state.countdown > 0) {
          commit('SET_COUNTDOWN', state.countdown - 1);
        } else {
          commit('CLEAR_COUNTDOWN_INTERVAL');
        }
      }, 1000);
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getUsers: state => state.users,
    formattedCountdown: state => {
      const minutes = Math.floor(state.countdown / 60);
      const seconds = state.countdown % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }
});
