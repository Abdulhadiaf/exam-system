// src/store/modules/papers.js
import axios from 'axios';

const state = {
  subjects: [],
};

const mutations = {
  SET_PAPERS(state, papers) {
    state.papers = papers;
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

};

const actions = {
  async fetchPapers({ commit }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/papers', {
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
      const response = await axios.get(`http://127.0.0.1:8000/api/papers/${paperId}`, {
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
      const response = await axios.get(`http://127.0.0.1:8000/api/load-answers/`, data, {
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
      const response = await axios.post('http://127.0.0.1:8000/api/papers', paper, {
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
      const response = await axios.post('http://127.0.0.1:8000/api/results', data, {
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
      const response = await axios.get('http://127.0.0.1:8000/api/results', {
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
      const response = await axios.post('http://127.0.0.1:8000/api/user-papers', data, {
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
      const response = await axios.post('http://127.0.0.1:8000/api/user-papers', data, {
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


};

const getters = {
  allPapers: state => state.papers,
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
