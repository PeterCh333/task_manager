import axiosInstance from '@/axios/axios.config'
import type { Task } from 'src/types/model.types'

export async function createTask(taskData: Task): Promise<Task> {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
}
export async function listTasks(filter?: string, search?: string): Promise<Task[]> {
  const url = new URL('/tasks', 'https://664250c33d66a67b34370073.mockapi.io/');

  if (filter) {
    url.searchParams.append('status', filter);
  }

  if (search) {
    url.searchParams.append('title', search);
  }

  const response = await axiosInstance.get(url.toString());
  return response.data;
}

export async function updateTask(task: Task): Promise<Task | null> {
    const response = await axiosInstance.put(`/tasks/${task.id}`, task);
    return response.data;
}

export async function deleteTask(id: string): Promise<void> {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data
}