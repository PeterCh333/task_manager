import { createTask, listTasks, updateTask, deleteTask } from '@/services/task.service'
import { describe, it, expect } from 'vitest';
import type { Task } from '@/types/model.types'

describe('Task Service', () => {
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

  it('creates a task', async () => {
    const newTask = await createTask(testTaskPayload);
    testTaskPayload.id = newTask.id;
    expect(newTask.title).toBe(testTaskPayload.title);
    expect(newTask.description).toBe(testTaskPayload.description);
  });

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
    const result = await listTasks(undefined, 'Test task');

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.some(task => task.title.includes('Test task'))).toBe(true);
  });

  it('updates a task', async () => {
    const updatedTaskData = { ...testTaskPayload, title: "Updated Task Title" };
    const updatedTask = await updateTask(updatedTaskData) as Task;
    expect(updatedTask.title).toBe(updatedTaskData.title);
  });

  it('deletes a task', async () => {
    const deletedTask = await deleteTask(testTaskPayload.id);
    expect(deletedTask).toBeDefined();
  });
});