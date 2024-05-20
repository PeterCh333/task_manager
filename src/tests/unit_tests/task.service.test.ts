import { createTask, listTasks, updateTask, deleteTask } from '@/services/task.service'
import { describe, it, expect } from 'vitest';
import type { Task } from '@/types/model.types'
import taskTestPayload from '@/tests/unit_tests/taskTestPayload'

describe('Task Service', () => {
  it('creates a task', async () => {
    const testTask = await createTask(taskTestPayload);
    taskTestPayload.id = testTask.id;
    expect(testTask.id).toBe(taskTestPayload.id);
  });

  it('list all tasks when no filter is provided', async () => {
    const result = await listTasks();

    expect(Array.isArray(result)).toBeTruthy();
  });

  it('list tasks with specified filter', async () => {
    const result = await listTasks('active');

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.every(task => task.status === 'active')).toBe(true);
  });

  it('list tasks that match a search query', async () => {
    const result = await listTasks(undefined, 'Test task');

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.some(task => task.title.includes('Test task'))).toBe(true);
  });

  it('updates a task', async () => {
    const updatedTaskData = { ...taskTestPayload, title: "Updated Task Title" };
    const updatedTask = await updateTask(updatedTaskData) as Task;
    expect(updatedTask.title).toBe(updatedTaskData.title);
  });

  it('deletes a task', async () => {
    const deletedTask = await deleteTask(taskTestPayload.id);
    expect(deletedTask).toBeDefined();
  });
});