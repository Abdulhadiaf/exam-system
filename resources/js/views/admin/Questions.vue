<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import DangerButton from '../../components/DangerButton.vue';
import InfoButton from '../../components/InfoButton.vue';

const store = useStore();

const qType = ref('');
const question_text = ref('');
const qOptions = ref('');
const paper_id = ref(0);
const editingId = ref(0);
const save = async () => {
    try {
        if (editingId.value) {
            await store.dispatch('questions/updateQuestion', { id: editingId.value, type: qType.value, paper_id: paper_id.value, question_text: question_text.value, options: qOptions.value });
            editingId.value = 0;
        } else {
            await store.dispatch('questions/createQuestion', { type: qType.value, paper_id: paper_id.value, question_text: question_text.value, 'options': qOptions.value });
        }
        qType.value = '';
        question_text.value = '';
        qOptions.value = '';
        paper_id.value = 0;
        editingId.value = 0;
        store.dispatch('questions/fetchQuestions');
    } catch (error) {
        console.error('Save failed', error);
    }
};

const questions = computed(() => store.getters['questions/allQuestions']);
const papers = computed(() => store.getters['papers/allPapers']);

onMounted(() => {
    store.dispatch('questions/fetchQuestions');
    store.dispatch('papers/fetchPapers');
});

const deleteQuestion = async (id) => {
    try {
        await store.dispatch('questions/deleteQuestion', id);
    } catch (error) {
        console.error('Delete failed', error);
    }
};
const editQuestion = (question) => {
    editingId.value = question.id;
    qType.value = question.type;
    question_text.value = question.question_text;
    qOptions.value = question.options;
    paper_id.value = question.paper_id;
};
</script>

<template>
    <div>
        <Card class="m-3">
            <Title>Questions</Title>

            <form @submit.prevent="save">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="mb-3">
                        <select id="subject" v-model="paper_id" title="Select paper"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>-Select paper-</option>
                            <option v-for="paper in papers" :value="paper.id" :key="paper.id">
                                {{ paper.title }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <select id="subject" v-model="qType" title="Select type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>-Select Type-</option>
                            <option>MCQ</option>
                            <option>Radio</option>
                            <option>Text</option>
                            <option>Date</option>
                            <option>Color</option>
                            <option>Textarea</option>
                        </select>
                    </div>
                    <div class="mb-3 col-span-2">
                        <input v-model="question_text" type="question_text" id="question_text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Question text" required />
                    </div>
                    <div class="mb-3 col-span-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options (only for MSQ and Radio question)</label>
                        <input v-model="qOptions" type="text" id="options"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="option,option,option..." />
                    </div>
                </div>
                <Button>Submit</Button>
            </form>
            <div class="relative overflow-x-auto border-t my-3">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">#</th>
                            <th scope="col" class="px-6 py-3">Paper</th>
                            <th scope="col" class="px-6 py-3">Type</th>
                            <th scope="col" class="px-6 py-3">Quetion text</th>
                            <th scope="col" class="px-6 py-3">Options</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="question in questions" :key="question.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th class="px-6 py-4">{{ question.id }}</th>
                            <th class="px-6 py-4">{{ question.paper.title }}</th>
                            <td class="px-6 py-4">{{ question.type }}</td>
                            <td class="px-6 py-4">{{ question.question_text }}</td>
                            <td class="px-6 py-4">{{ question.options }}</td>
                            <td class="px-6 py-4">
                                <InfoButton @click="editQuestion(question)">Edit</InfoButton>
                                <DangerButton @click="deleteQuestion(question.id)">Delete</DangerButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
</template>
