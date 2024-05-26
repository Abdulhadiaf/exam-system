// src/store/modules/papers.js
import axios from 'axios';
import { API_URL } from '../../config/constant.js';

const state = {
  subjects: [],
};

const mutations = {
  SET_PAPERS(state, papers) {
    state.papers = papers;
  },
  SET_USER_PAPER(state, user_papers) {
    state.user_papers = user_papers;
  },
  SET_PAPER(state, paper) {
    state.paper = paper;
  },
  SET_PAPER_ANSWER(state, paper_answers) {
    state.paper_answers = paper_answers;
  },
  ADD_PAPER(state, paper) {
    state.papers.push(paper);
  },
  ADD_RESULT(state, result) {
    state.results.push(result);
  },
  SET_RESULTS(state, results) {
    state.results = results;
  },
  REMOVE_PAPER(state, paperId) {
    state.papers = state.papers.filter(paper => paper.id !== paperId);
  },
};

const actions = {
  async fetchPapers({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/papers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('SET_PAPERS', response.data);
    } catch (error) {
      console.error('Failed to fetch papers', error);
    }
  },
  async fetchPaper({ commit }, paperId) {
    try {
      const response = await axios.get(`${API_URL}/papers/${paperId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      // console.log(response.data);
      commit('SET_PAPER', response.data);
    } catch (error) {
      console.error('Failed to fetch papers', error);
    }
  },
  async fetchPaperAnswers({ commit }, data) {
    try {
      const response = await axios.get(`${API_URL}/load-answers/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response.data);
      commit('SET_PAPER_ANSWER', response.data);
    } catch (error) {
      console.error('Failed to fetch papers', error);
    }
  },
  async createPaper({ commit }, paper) {
    try {
      const response = await axios.post(`${API_URL}/papers`, paper, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response);
      commit('ADD_PAPER', response.data);
    } catch (error) {
      console.error('Failed to create paper', error);
    }
  },
  async createResult({ commit }, data) {
    try {
      const response = await axios.post(`${API_URL}/results`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response);
      commit('ADD_RESULT', response.data);
    } catch (error) {
      console.error('Failed to create paper', error);
    }
  },
  async fetchResults({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/results`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('SET_RESULTS', response.data);
    } catch (error) {
      console.error('Failed to fetch papers', error);
    }
  },
  async startPaper({ commit }, data) {
    try {
      const response = await axios.post(`${API_URL}/user-papers`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to start paper', error);
    }
  },
  async endPaper({ commit }, data) {
    try {
      const response = await axios.post(`${API_URL}/user-papers`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to start paper', error);
    }
  },
  async deletePaper({ commit }, paperId) {
    try {
      await axios.delete(`${API_URL}/papers/${paperId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('REMOVE_PAPER', paperId);
    } catch (error) {
      console.error('Failed to delete paper', error);
    }
  },
  async fetchUserPapers({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/user-papers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response.data);
      commit('SET_USER_PAPER', response.data);
    } catch (error) {
      console.error('Failed to delete paper', error);
    }
  }


};

const getters = {
  allPapers: state => state.papers,
  allUserPapers: state => state.user_papers,
  aPaper: state => state.paper,
  paperAnswers: state => state.paper_answers,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
