import { createTask, listTasks, updateTask, deleteTask, getTask } from '@/services/task.service'
import { describe, it, expect } from 'vitest';
import type { Task } from '@/types/model.types'

describe('Task Service', () => {
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

  it('creates a task', async () => {
    const newTask = await createTask(testTask);
    expect(newTask.title).toBe(testTask.title);
    expect(newTask.description).toBe(testTask.description);
  });

  it('gets a tasks', async () => {
    const task = await getTask(testTask.id);
    expect(task).not.toBeNull();
    if (task !== null) {
      expect(task.id).toEqual(testTask.id);
    }
  })

  it('should fetch all tasks when no filter is provided', async () => {
    const result = await listTasks();

    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should fetch tasks with specified filter', async () => {
    const result = await listTasks('active');

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.every(task => task.status === 'active')).toBe(true);
  });

  it('should fetch tasks that match a search query', async () => {
    const result = await listTasks(undefined, 'Bug');

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.some(task => task.title.includes('Bug'))).toBe(true);
  });

  it('updates a task', async () => {
    const updatedTaskData = { ...testTask, title: "Updated Task Title" };
    const updatedTask = await updateTask(updatedTaskData) as Task;
    expect(updatedTask.title).toBe(updatedTaskData.title);
  });

  it('deletes a task', async () => {
    const deletedTask = await deleteTask(testTask.id);

    expect(deletedTask).toBeDefined();
  });
});