<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import DangerButton from '../../components/DangerButton.vue';
import InfoButton from '../../components/InfoButton.vue';

const store = useStore();

const name = ref('');
const description = ref('');
const editingSubjectId = ref(0);
const save = async () => {
    try {
        if (editingSubjectId.value) {
            // Update existing subject
            await store.dispatch('subjects/updateSubject', { id: editingSubjectId.value, name: name.value, description: description.value });
            editingSubjectId.value = 0;
        } else {
            // Create new subject
            await store.dispatch('subjects/createSubject', { name: name.value, description: description.value });
        }
        name.value = '';
        description.value = '';
        store.dispatch('subjects/fetchSubjects');
    } catch (error) {
        console.error('Save failed', error);
    }
};

const subjects = computed(() => store.getters['subjects/allSubjects']);

onMounted(() => {
    store.dispatch('subjects/fetchSubjects');
});

const deleteSubject = async (id) => {
    try {
        await store.dispatch('subjects/deleteSubject', id);
    } catch (error) {
        console.error('Delete failed', error);
    }
};
const editSubject = (subject) => {
    editingSubjectId.value = subject.id;
    name.value = subject.name;
    description.value = subject.description;
};
</script>

<template>
    <div>
        <Card class="m-3">
            <Title>Subjects</Title>

            <form @submit.prevent="save">
                <div class="mb-5">
                    <input v-model="name" type="text" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Subject name" required />
                </div>

                <div class="mb-5">
                    <textarea v-model="description" id="details" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Subject details"></textarea>
                </div>
                <Button>Submit</Button>
            </form>
            <div class="relative overflow-x-auto border-t my-3">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">#</th>
                            <th scope="col" class="px-6 py-3">Subject Name</th>
                            <th scope="col" class="px-6 py-3">Details</th>
                            <th scope="col" class="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="subject in subjects" :key="subject.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th class="px-6 py-4">{{ subject.id }}</th>
                            <td class="px-6 py-4">{{ subject.name }}</td>
                            <td class="px-6 py-4">{{ subject.description }}</td>
                            <td class="px-6 py-4">
                                <InfoButton @click="editSubject(subject)">Edit</InfoButton>
                                <DangerButton @click="deleteSubject(subject.id)">Delete</DangerButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
</template>
