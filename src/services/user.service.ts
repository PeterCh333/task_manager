import axiosInstance from '@/axios/axios.config'
import type { User } from 'src/types/model.types'

export async function createUser(user: User): Promise<User> {
  const response = await axiosInstance.post('/users', user);
  return response.data;
}

export async function getUser(id: string): Promise<User | null> {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
}

export async function listUsers(filter?: string): Promise<User[]> {
  const url = filter ? `/users?status=${filter}` : '/users';
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function updateUser(task: User): Promise<User | null> {
  const response = await axiosInstance.put(`/users/${task.id}`, task);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await axiosInstance.delete(`/users/${id}`);
}