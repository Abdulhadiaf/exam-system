<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';

const store = useStore();
const route = useRoute();
const paper = computed(() => store.getters['papers/aPaper']);
const paperId = computed(() => route.params.id);
const formData = ref({});

const initializeFormData = () => {
  if (paper.value && paper.value.questions) {
    // console.log(paper.value.questions);
    const initialFormData = {};
    paper.value.questions.forEach(question => {
      if (question.type === 'MCQ' || question.type === 'Radio') {
        initialFormData[question.id] = [];
      } else {
        initialFormData[question.id] = '';
      }
    });
    // console.log(initialFormData);
    initialFormData['paper_id'] = route.params.id;
    formData.value = initialFormData;
  }
};
const countdown = computed(() => store.getters.formattedCountdown);

onMounted(async () => {
  store.dispatch('refreshCurrentTime');
  await store.dispatch('papers/fetchPaper', paperId.value);
  await store.dispatch('papers/startPaper', { paper_id: paperId.value, started_at: store.state.current_time });
  initializeFormData();
  const paperTime = paper.value.duration ;
  store.dispatch('startCountdown', paperTime * 60);

});


const save = async () => {
  // console.log(formData.value);
  try {
    store.dispatch('refreshCurrentTime');
    const completed_at = store.state.current_time;
    formData.value.completed_at = completed_at;
    await store.dispatch('papers/endPaper', formData.value);
  } catch (error) {
    console.error('Failed to save answers', error);
    alert('Failed to save answers');
  }
};
</script>

<template>
  <Card class="m-3">
    <Title>{{ paper ? paper.title : '' }}</Title>
    <p><b>Subject: </b>{{ paper ? paper.subject.name : '' }}</p>
    <p class="mb-5"><b>Duration: </b>{{ paper ? paper.duration : '' }} mins</p>
    <p class="mb-5"><b>Time left: </b>{{ countdown }} </p>
    <hr>
    <form @submit.prevent="save">
      {{ formData.q_id6 }}
      <ul v-if="paper && paper.questions">
        <li v-for="(question, index) in paper.questions" :key="question.id">
          <b>{{ (index + 1) + '- ' + question.question_text }}</b>
          <div v-if="question.type === 'MCQ'">
            <!-- Example for MCQ: display checkboxes -->
            <div v-for="option in question.options" :key="option">
              <div class="flex items-center mb-4">
                <input type="checkbox" :name="question.id" :value="option"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="formData[question.id]">
                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ option }}</label>
              </div>
            </div>
          </div>
          <div v-else-if="question.type === 'Radio'">
            <!-- Example for Radio: display radio buttons -->
            <div v-for="option in question.options" :key="option">
              <div class="flex items-center mb-4">
                <input type="radio" :name="question.id" :value="option"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  v-model="formData[question.id]">
                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ option }}</label>
              </div>
            </div>
          </div>
          <div v-else-if="question.type === 'Text'">
            <!-- Example for Text: display text input -->
            <input type="text" :name="question.id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="..." required v-model="formData[question.id]" />
          </div>
          <div v-else-if="question.type === 'Date'">
            <!-- Example for Date: display date input -->
            <input type="date" :name="question.id"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="..." required v-model="formData[question.id]" />
          </div>
          <div v-else-if="question.type === 'Color'">
            <!-- Example for Color: display color input -->
            <input type="color" :name="question.id" v-model="formData[question.id]">
          </div>
          <div v-else-if="question.type === 'Textarea'">
            <!-- Example for Textarea: display textarea -->
            <textarea :name="question.id" rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..." v-model="formData[question.id]"></textarea>
          </div>
        </li>
      </ul>
      <Button class="my-3">Submit</Button>
    </form>
  </Card>
</template>
