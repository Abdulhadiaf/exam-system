<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import DangerButton from '../../components/DangerButton.vue';
import InfoButton from '../../components/InfoButton.vue';

const store = useStore();

const title = ref('');
const duration = ref('');
const subject = ref(0);
const editingId = ref(0);
const save = async () => {
    try {
        if (editingId.value) {
            await store.dispatch('papers/updatePaper', { id: editingId.value, subject_id: subject.value, title: title.value, duration: duration.value });
            editingId.value = 0;
        } else {
            await store.dispatch('papers/createPaper', { subject_id: subject.value, title: title.value, duration: duration.value });
        }
        title.value = '';
        duration.value = '';
        subject.value = 0;
        store.dispatch('papers/fetchPapers');
    } catch (error) {
        console.error('Save failed', error);
    }
};

const subjects = computed(() => store.getters['subjects/allSubjects']);
const papers = computed(() => store.getters['papers/allPapers']);

onMounted(() => {
    store.dispatch('subjects/fetchSubjects');
    store.dispatch('papers/fetchPapers');
});

const deletePaper = async (id) => {
    try {
        await store.dispatch('papers/deletePaper', id);
    } catch (error) {
        console.error('Delete failed', error);
    }
};
const editPaper = (paper) => {
    editingId.value = paper.id;
    title.value = paper.title;
    duration.value = paper.duration;
    subject.value = paper.subject_id;
};
</script>

<template>
    <div>
        <Card class="m-3">
            <Title>Papers</Title>

            <form @submit.prevent="save">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="mb-5">
                        <select id="subject" v-model="subject" title="Select subject"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>-Select subject-</option>
                            <option v-for="subject in subjects" :value="subject.id" :key="subject.id">
                                {{ subject.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <input v-model="title" type="text" id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Paper title" required />
                    </div>
                    <div class="mb-5">
                        <input v-model="duration" type="number" id="duration"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Paper duration" required />
                    </div>
                </div>
                <Button>Submit</Button>
            </form>
            <div class="relative overflow-x-auto border-t my-3">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">#</th>
                            <th scope="col" class="px-6 py-3">Subject Name</th>
                            <th scope="col" class="px-6 py-3">Title</th>
                            <th scope="col" class="px-6 py-3">Duration</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="paper in papers" :key="paper.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th class="px-6 py-4">{{ paper.id }}</th>
                            <th class="px-6 py-4">{{ paper.subject.name }}</th>
                            <td class="px-6 py-4">{{ paper.title }}</td>
                            <td class="px-6 py-4">{{ paper.duration }}</td>
                            <td class="px-6 py-4">
                                <InfoButton @click="editPaper(paper)">Edit</InfoButton>
                                <DangerButton @click="deletePaper(paper.id)">Delete</DangerButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
</template>
