<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import DangerButton from '../../components/DangerButton.vue';
import InfoButton from '../../components/InfoButton.vue';
import UserPaperDetails from './UserPaperDetails.vue';
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


const user_papers = computed(() => store.getters['papers/allUserPapers']);

onMounted(() => {
    store.dispatch('papers/fetchUserPapers');
    console.log(user_papers.value);
});

const selectedPaperId = ref(null);

const toggleDetails = (id) => {
    if (selectedPaperId.value === id) {
        selectedPaperId.value = null;
    } else {
        selectedPaperId.value = id;
    }
};
</script>

<template>
    <div>
        <Card class="m-3">
            <Title>Results</Title>
            <div v-for="user_paper in user_papers"
                class="block max-w-sm p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                    user_paper.paper.title }}</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">{{ user_paper.user.name }}</p>
                <Button @click="toggleDetails(user_paper.id)"> View answers</Button>
                <UserPaperDetails v-if="selectedPaperId === user_paper.id" :userPaper="user_paper" />
            </div>
        </Card>
    </div>
</template>
