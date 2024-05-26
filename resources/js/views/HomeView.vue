<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const count = computed(() => store.state.count)

onMounted(() => {
  console.log('the component is now mounted.')
  
})

function increment() {
  store.commit('increment')
  console.log(store.state.count)
}
</script>

<template>
  

</template>
