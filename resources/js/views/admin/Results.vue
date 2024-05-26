<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import DangerButton from '../../components/DangerButton.vue';
import InfoButton from '../../components/InfoButton.vue';

const store = useStore();

const user = ref('');
const paper = ref('');
const final_score = ref('');
const feedback = ref(0);
const paper_answers = ref({});
const save = async () => {
    try {
        await store.dispatch('papers/createResult', { user_id: user.value, paper_id: paper.value, final_score: final_score.value, feedback: feedback.value });
        title.value = '';
        duration.value = '';
        subject.value = 0;
        store.dispatch('papers/fetchResults');
    } catch (error) {
        console.error('Save failed', error);
    }
};
const loadPaper = async () => {
    try {
        store.dispatch('papers/fetchPaperAnswers', { user_id: user.value, paper_id: paper.value });
        paper_answers.value = store.getters['papers/paperAnswers']
    } catch (error) {
        console.error('Save failed', error);
    }
};

const papers = computed(() => store.getters['papers/allPapers']);
const users = computed(() => store.getters['getUsers']);

onMounted(() => {
    store.dispatch('subjects/fetchSubjects');
    store.dispatch('papers/fetchPapers');
    store.dispatch('fetchUsers');
});


</script>

<template>
    <div>
        <Card class="m-3">
            <Title>Results</Title>

            <form @submit.prevent="save">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="mb-5">
                        <select id="user" v-model="user" title="Select user"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>-Select user-</option>
                            <option v-for="user in users" :value="user.id" :key="user.id">
                                {{ user.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <select @change="loadPaper" id="paper" v-model="paper" title="Select paper"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>-Select paper-</option>
                            <option v-for="paper in papers" :value="paper.id" :key="paper.id">
                                {{ paper.title }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-5">
                        <input v-model="final_score" type="text" id="final_score"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Final score" required />
                    </div>
                    <div class="mb-5">
                        <input v-model="feedback" type="text" id="feedback"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Paper feedback" required />
                    </div>
                </div>
                <Button>Submit</Button>
            </form>
            <div class="relative overflow-x-auto border-t my-3">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">#</th>
                            <th scope="col" class="px-6 py-3">User Name</th>
                            <th scope="col" class="px-6 py-3">Paper</th>
                            <th scope="col" class="px-6 py-3">Score</th>
                            <th scope="col" class="px-6 py-3">Feedback</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="result in results" :key="result.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th class="px-6 py-4">{{ result.id }}</th>
                            <th class="px-6 py-4">{{ result.userPaper.user.name }}</th>
                            <td class="px-6 py-4">{{ paper.userPaper.paper.title }}</td>
                            <td class="px-6 py-4">{{ paper.final_score }}</td>
                            <td class="px-6 py-4">{{ paper.feedback }}</td>
                            <td class="px-6 py-4">
                                <InfoButton>Edit</InfoButton>
                                <DangerButton>Delete</DangerButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
</template>
