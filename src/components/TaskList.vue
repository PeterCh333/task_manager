<template>
  <div class="task-list-container">
    <v-list-item>
        <v-text-field v-model="searchQuery" placeholder="Search" @input="searchAndFilter"></v-text-field>
    </v-list-item>

    <v-chip-group class="ml-5" v-model="selectedFilter">
      <v-chip v-for="(filter, index) in filters" :key="index" :value="filter" @input="searchAndFilter">{{ filter }}</v-chip>
    </v-chip-group>

    <v-list lines="one" class="task-list">
      <TaskListItem
        v-for="task in store.tasks"
        :key="task.id"
        :id="task.id"
        :task="task"
        :title="task.title"
        :status="task.status"
      ></TaskListItem>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import TaskListItem from './TaskListItem.vue'
import { useTaskStore } from '@/stores/task.store'
import { ref, watch } from 'vue'

const store = useTaskStore()

const filters = ['All', 'Active', 'Completed'];

const searchQuery = ref('')
const selectedFilter = ref('All');

function searchAndFilter () {
  let filterParam;
  let searchParam;

  if(searchQuery.value === '') {
    searchParam = undefined;
  }else {
    searchParam = searchQuery.value
  }

  if (selectedFilter.value === 'All') {
    filterParam = undefined;
  } else if (selectedFilter.value === 'Completed') {
    filterParam = 'Completed';
  } else if (selectedFilter.value === 'Active') {
    filterParam = 'Active';
  }

  store.fetchTasks(filterParam, searchParam)
}

watch(searchQuery, () => {
  searchAndFilter()
})

watch(selectedFilter, () => {
  searchAndFilter()
})

</script>


<style scoped>
.task-list-container {
  height: 700px;
  overflow-y: auto;
  min-width: 360px;

}

.task-list {
  width: 100%;
}
</style>
