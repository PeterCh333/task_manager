<script setup lang="ts">
import { ref, watch } from 'vue';
import TaskList from '@/components/TaskList.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import { useTaskStore } from '@/stores/task.store';
import type { Task } from '@/types/model.types';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import VueDatePicker from '@vuepic/vue-datepicker';

const store = useTaskStore();

const dialog = ref(false);
const defaultTask: Task = {
  id: '',
  createdAt: '',
  updatedAt: '',
  title: '',
  description: '',
  deadline: '',
  status: 'Active',
  createdByUserId: '',
};
const newTask = ref<Task>({ ...defaultTask });
const selectedDeadline = ref<Date | null>(null);

const validations = {
  newTask: {
    title: { required },
    description: { required },
    deadline: {
      required,
      minValue: {
        $value: newTask.value.createdAt,
        $message: 'Deadline must be in the future',
        $validator: (value: string) => new Date(value) > new Date(),
      }
    },
  }
};

const v$ = useVuelidate(validations, { newTask });

const createTask = () => {
  if (v$.value.$invalid) {
    console.error('Form is invalid');
    return;
  }
  //Tieto hodnoty by sme za normálnych okolností nastavili na backende
  newTask.value.createdAt = new Date().toISOString();
  newTask.value.updatedAt = new Date().toISOString();

  store.createTask(newTask.value);
  closeDialog();
};

const openDialog = () => {
  setNewTaskDefaultValues();
  dialog.value = true;
};

const closeDialog = () => {
  setNewTaskDefaultValues();
  dialog.value = false;
};

const setNewTaskDefaultValues = () => {
  newTask.value = { ...defaultTask };
};

watch(selectedDeadline, (newValue) => {
  newTask.value.deadline = newValue ? newValue.toISOString() : '';
});
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="d-flex mt-5">
        <task-list></task-list>
        <task-component :task="store.selectedTask"></task-component>
      </div>

      <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              size="large"
              class="text-none font-weight-regular mb-15"
              color="primary"
              fab
              rounded
              v-bind="activatorProps"
              @click="openDialog"
            >
              Add task
            </v-btn>
          </template>

          <v-card data-testid="task-modal" class="overflow-visible" title="Create New Task">
            <v-card-text>
              <v-form @submit.prevent="createTask">
                <div>Fill in all fields and set the deadline in the future</div>

                <v-text-field v-model="newTask.title" label="Title"></v-text-field>
                <v-text-field v-model="newTask.description" label="Description"></v-text-field>

                <!-- Musel som použiť vue datepicker pretože vuetify timepicker nefungoval-->
                <div>
                  <label class="date-picker-label">Deadline</label>
                  <VueDatePicker v-model="selectedDeadline" data-testid="date-picker"/>
                </div>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="primary" @click="createTask">Create</v-btn>
              <v-btn color="grey" @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.wrapper {
  max-width: 1200px;
  width: 100%;
}
</style>
