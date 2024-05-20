<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task.store';
import type { Task } from '@/types/model.types';

const props = defineProps<{
  task: Task | null;
}>();

const store = useTaskStore();

onMounted(() => {
  store.selectTask()
})
const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

function markTaskAsCompleted(task: Task) {
  task.status = 'Completed';
  store.updateTask(task);
}

function activateTask(task: Task) {
  task.status = 'Active';
  store.updateTask(task);
}

//Vieme komponent sa nezobrazí ak nemáme task takže nemôže byť null čiže môžeme použiť !
async function deleteTask() {
  await store.removeTask(props.task!.id);
  await store.selectTask()
}

</script>

<template>
  <v-card class="w-100" v-if="props.task">

    <v-card-title>{{ props.task.title }} </v-card-title>
    <v-card-text>
      <div>Description: {{ props.task.description }}</div>
      <div>Deadline: {{ formatDateTime(props.task.deadline) }}</div>
      <div>Status: {{ props.task.status }}</div>
      <div>Created: {{ formatDateTime(props.task.createdAt) }}</div>
      <div>Updated: {{ formatDateTime(props.task.updatedAt) }}</div>
      <div>Created By: {{ props.task.createdByUserId }}</div>
    </v-card-text>
    <v-card-actions>

      <v-btn v-if="props.task.status === 'Active'" color="primary" @click="markTaskAsCompleted(props.task)">mark as complete</v-btn>
      <v-btn v-else color="primary" @click="activateTask(props.task);">mark as active</v-btn>
      <v-btn color="error" @click="deleteTask">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>