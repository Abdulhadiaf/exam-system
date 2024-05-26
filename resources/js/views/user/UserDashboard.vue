<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

import Card from '../../components/Card.vue';
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';

const store = useStore();
const router = useRouter();

const papers = computed(() => store.getters['papers/allPapers']);
onMounted(() => {
  store.dispatch('papers/fetchPapers');
});

const attempt = (id) => {
  router.push({ path: `/attempt/${id}` })
};
</script>
<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card class="m-3" v-for="paper in papers" :key="paper.id">
      <Title>{{ paper.title }}</Title>
      <p><b>Subject: </b>{{ paper.subject.name }}</p>
      <p class="mb-5"><b>Duration: </b>{{ paper.duration }} mins</p>
      <Button @click="attempt(paper.id)" v-if="!paper.user_papers[0]">Attemt</Button>
      <p class="text-green-600" v-if="paper.user_papers[0]">
        <b>Attepted</b><br>
        <b>Started at</b>: {{ paper.user_papers[0].started_at }} <br>
        <b>Completed at</b>: {{ paper.user_papers[0].completed_at }}
      </p>
    </Card>
  </div>
</template>
