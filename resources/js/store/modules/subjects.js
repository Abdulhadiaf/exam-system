// src/store/modules/subjects.js
import axios from 'axios';

const state = {
  subjects: [],
};

const mutations = {
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  },
  ADD_SUBJECT(state, subject) {
    state.subjects.push(subject);
  },
  UPDATE_SUBJECT(state, updatedSubject) {
    state.subjects = state.subjects.map(subject => {
      if (subject.id === updatedSubject.id) {
        return updatedSubject;
      }
      return subject;
    });
  },
  REMOVE_SUBJECT(state, subjectId) {
    state.subjects = state.subjects.filter(subject => subject.id !== subjectId);
  },
};

const actions = {
  async fetchSubjects({ commit }) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/subjects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('SET_SUBJECTS', response.data);
    } catch (error) {
      console.error('Failed to fetch subjects', error);
    }
  },
  async createSubject({ commit }, subject) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/subjects', subject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('ADD_SUBJECT', response.data);
    } catch (error) {
      console.error('Failed to create subject', error);
    }
  },
  async updateSubject({ commit }, updatedSubject) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/subjects/${updatedSubject.id}`, updatedSubject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('UPDATE_SUBJECT', response.data);
    } catch (error) {
      console.error('Failed to update subject', error);
    }
  },

  async deleteSubject({ commit }, subjectId) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      commit('REMOVE_SUBJECT', subjectId);
    } catch (error) {
      console.error('Failed to delete subject', error);
    }
  }
};

const getters = {
  allSubjects: state => state.subjects,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
