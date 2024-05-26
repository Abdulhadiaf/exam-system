// src/store/modules/questions.js
import axios from 'axios';
import { API_URL } from '../../config/constant.js';

const state = {
  questions: [],
};

const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions;
  },
  ADD_QUESTION(state, question) {
    state.questions.push(question);
  },
  UPDATE_QUESTION(state, updatedSubject) {
    state.questions = state.questions.map(question => {
      if (question.id === updatedSubject.id) {
        return updatedQuestion;
      }
      return question;
    });
  },
  REMOVE_QUESTION(state, questionId) {
    state.questions = state.questions.filter(question => question.id !== questionId);
  },
};

const actions = {
  async fetchQuestions({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('SET_QUESTIONS', response.data);
    } catch (error) {
      console.error('Failed to fetch question', error);
    }
  },
  async createQuestion({ commit }, question) {
    try {
      const response = await axios.post(`${API_URL}/questions`, question, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(response);
      commit('ADD_QUESTION', response.data);
    } catch (error) {
      console.error('Failed to create question', error);
    }
  },
  async updateQuestion({ commit }, updatedQuestion) {
    try {
      const response = await axios.put(`${API_URL}/questions/${updatedQuestion.id}`, updatedQuestion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('UPDATE_QUESTION', response.data);
    } catch (error) {
      console.error('Failed to update question', error);
    }
  },

  async deleteQuestion({ commit }, questionId) {
    try {
      await axios.delete(`${API_URL}/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('REMOVE_QUESTION', questionId);
    } catch (error) {
      console.error('Failed to delete question', error);
    }
  }
};

const getters = {
  allQuestions: state => state.questions,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
