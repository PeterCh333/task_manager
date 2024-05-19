<script setup lang="ts">
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/task.store'

const store = useTaskStore();

const props = defineProps({
  id: String,
  title: String,
  deadline: Date,
  status: String,
});


</script>

<template>
  <div  class="d-flex w-100 align-items-center justify-content-around cursor-pointer" >
    <v-container @click="store.selectTask(props.id)">
      <strong>
        {{ title }}
      </strong>

      <div>
        {{ status }}
      </div>
    </v-container>
  </div>

</template>

<style scoped>

</style>