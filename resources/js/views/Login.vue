<script setup>
import { ref } from 'vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import Title from '../components/Title.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import UserDashboard from '../views/user/UserDashboard.vue';
import { useStore } from 'vuex'

const store = useStore();

const email = ref('');
const password = ref('');

const login = async () => {
    try {
        await store.dispatch('login', { email: email.value, password: password.value });
        const role = localStorage.getItem('userRole');

        if (role === 'admin') {
            window.location.href="/admin";
        } else {
            window.location.href="/user";
        }
    } catch (error) {
        console.error('Login failed', error);
    }
};
</script>
<template>
    <Card class="mx-auto max-w-sm ">
        <Title>Login</Title>
        <form @submit.prevent="login" class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    email</label>
                <input v-model="email" type="email" id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    password</label>
                <input v-model="password" type="password" id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <Button>Submit</Button>
        </form>
    </Card>

</template>
