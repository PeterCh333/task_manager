import { defineStore } from 'pinia';
import type { Task } from 'src/types/model.types';
import {
  createTask,
  listTasks,
  updateTask,
  deleteTask
} from '@/services/task.service';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    selectedTask: null as Task | null,
  }),
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getSelectedTask(state) {
      return state.selectedTask;
    }
  },
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
      await createTask(task);
      this.tasks.push(task);
    },

    async getTask(task: Task) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        return this.tasks[index];
      } else {
        return null;
      }
    },

    async fetchTasks(filter?: string, search?: string) {
      try {
        const tasks = await listTasks(filter, search);
        this.tasks = tasks;
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
