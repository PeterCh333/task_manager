import { useTaskStore } from '@/stores/task.store';
import { describe, it, expect } from 'vitest';
import { createPinia } from 'pinia'

const pinia = createPinia();
const taskStore = useTaskStore(pinia);
import taskTestPayload from '@/tests/unit_tests/taskTestPayload'


describe('Task Store', () => {
  it('creates a task in store', async () => {
    await taskStore.createTask(taskTestPayload);
    taskTestPayload.id = taskStore.tasks[0].id;

    expect(taskStore.tasks[0].id).toContainEqual(taskTestPayload.id);
  });

  it('fetches tasks and updates store', async () => {
    await taskStore.fetchTasks();

    expect(taskStore.tasks.length).toBeGreaterThan(0);
  });

  it('updates a task in store', async () => {

    const updatedTaskData = { ...taskTestPayload, title: "Updated Task Title" };
    await taskStore.updateTask(updatedTaskData);

    expect(taskStore.tasks.find(task => task.id === taskTestPayload.id)?.title).toEqual(updatedTaskData.title);
  });

  it('deletes a task from store', async () => {

    await taskStore.removeTask(taskTestPayload.id);

    expect(taskStore.tasks.find(task => task.id === taskTestPayload.id)).toBeUndefined();
  });
});