<script setup>
import { ref } from 'vue'

import Navbar from '../components/Navbar.vue'
import { LOGO_PATH } from '../config/constant.js';

const logoPath = ref(LOGO_PATH);
</script>
<template>
  <div>
    <Navbar />
    <main class="mt-20" style="min-height: 65vh;">
      <router-view></router-view>
    </main>


    <footer class="bg-white shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img :src="logoPath" class="h-8" alt="Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Exam System</span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a
            href="https://abdulhadi-af.web.app/" class="hover:underline">Abdul Hadi Afghan™</a>. All Rights
          Reserved.</span>
      </div>
    </footer>


  </div>
</template>
