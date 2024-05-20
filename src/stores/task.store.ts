import { defineStore } from 'pinia'
import type { Task } from 'src/types/model.types'
import { createTask, deleteTask, listTasks, updateTask } from '@/services/task.service'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    selectedTask: null as Task | null,
  }),
  actions: {
    async selectTask(id?: string) {
      if (id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
          this.selectedTask = task;
        }
      } else {
        if (this.tasks.length > 0) {
          this.selectedTask = this.tasks[0];
        } else {
          this.selectedTask = null;
        }
      }
    },

    async createTask(task: Task) {
      this.tasks.push(await createTask(task));
    },

    async fetchTasks(filter?: string, search?: string) {
      try {
        this.tasks = await listTasks(filter, search);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          this.tasks = [];
        } else {
          throw error;
        }
      }
    },

    async updateTask(task: Task) {
      await updateTask(task);
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
    },

    async removeTask(id: string) {
      await deleteTask(id);

      const index = this.tasks.findIndex(task => task.id === id);

      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
  },
});
