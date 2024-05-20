import { useTaskStore } from '@/stores/task.store';
import { describe, it, expect } from 'vitest';
import { createPinia } from 'pinia'

const pinia = createPinia();
const taskStore = useTaskStore(pinia);
const testTaskPayload = {
  createdAt: "2024-05-14T00:33:58.139Z",
  updatedAt: "2024-05-13T18:48:50.762Z",
  deadline: "2024-10-09T18:15:38.749Z",
  description: "This is a new task description",
  status: 'active',
  title: "Test task",
  createdByUserId: "1",
  id: ''
};

describe('Task Store', () => {
  it('creates a task in store', async () => {
    await taskStore.createTask(testTaskPayload);
    testTaskPayload.id = taskStore.tasks[0].id;

    expect(taskStore.tasks[0].id).toContainEqual(testTaskPayload.id);

  });

  it('fetches tasks and updates store', async () => {
    await taskStore.fetchTasks();

    expect(taskStore.tasks.length).toBeGreaterThan(0);
  });

  it('updates a task in store', async () => {

    const updatedTaskData = { ...testTaskPayload, title: "Updated Task Title" };
    await taskStore.updateTask(updatedTaskData);

    expect(taskStore.tasks.find(task => task.id === testTaskPayload.id)?.title).toEqual(updatedTaskData.title);
  });

  it('deletes a task from store', async () => {

    await taskStore.removeTask(testTaskPayload.id);

    expect(taskStore.tasks.find(task => task.id === testTaskPayload.id)).toBeUndefined();
  });
});