<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    userPaper: Object
});
</script>
<template>
    <div class="details p-4 mt-4 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Paper Details</h3>
        <p><strong>Started At:</strong> {{ userPaper.started_at }}</p>
        <p><strong>Completed At:</strong> {{ userPaper.completed_at }}</p>
        <ul>
            <li class="border border-gray-300 p-3" v-for="(user_answer, i) in userPaper.user_answers">
                <b>Q{{ i + 1 }}-</b> {{ user_answer.question.question_text }} <br>
                <b>A{{ i + 1 }}-</b> {{ user_answer.answer }}
            </li>
        </ul>
    </div>
</template>
