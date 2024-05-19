import { useTaskStore } from '@/stores/task.store';
import { describe, it, expect } from 'vitest';
import type { Task } from '@/types/model.types';
import { createPinia } from 'pinia'

const pinia = createPinia();
const taskStore = useTaskStore(pinia);
const testTask = {
  createdAt: "2024-05-14T00:33:58.139Z",
  updatedAt: "2024-05-13T18:48:50.762Z",
  deadline: "2024-10-09T18:15:38.749Z",
  description: "Illo important quisquam adipisci atque earum. Totam sequi temporibus. Quis veritatis error exercitationem quo quibusdam.",
  status: 'active',
  assignedToTask: [],
  title: "Bug fixes",
  createdByUserId: "1",
  id: '1'
};

describe('Task Store', () => {
  it('creates a task in store', async () => {

    await taskStore.createTask(testTask);

    expect(taskStore.tasks).toContainEqual(testTask);
  });

  it('fetches tasks and updates store', async () => {
    await taskStore.fetchTasks();

    expect(taskStore.tasks.length).toBeGreaterThan(0);
  });

  it('updates a task in store', async () => {

    const updatedTaskData = { ...testTask, title: "Updated Task Title" };
    await taskStore.updateTask(updatedTaskData);

    expect(taskStore.tasks.find(task => task.id === testTask.id)?.title).toEqual(updatedTaskData.title);
  });

  it('deletes a task from store', async () => {

    await taskStore.removeTask(testTask.id);

    expect(taskStore.tasks.find(task => task.id === testTask.id)).toBeUndefined();
  });
});